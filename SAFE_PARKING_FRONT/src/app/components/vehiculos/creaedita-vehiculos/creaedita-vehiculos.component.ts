import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { Params, Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { ColorEvent } from 'ngx-color';

export function tarjetaPropiedadValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const isValid = /^[0-9]{12}$/.test(value);

    return isValid
      ? null
      : { invalidTarjetaPropiedad: { value: control.value } };
  };
}

@Component({
  selector: 'app-creaedita-vehiculos',
  templateUrl: './creaedita-vehiculos.component.html',
  styleUrls: ['./creaedita-vehiculos.component.css'],
  template: ` <color-sketch (onChange)="handleChange($event)"></color-sketch> `,
})
export class CreaeditaVehiculosComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  vehiculo: Vehiculo = new Vehiculo();
  mensaje: string = '';
  colorSeleccionado: string = '#ffffff'; // Color predeterminado
  id: number = 0;
  edicion: boolean = false;

  categorias: { value: string; viewValue: string }[] = [
    { value: 'automóvil', viewValue: 'Automovil' },
    { value: 'motocicleta', viewValue: 'Motocicleta' },
    { value: 'camioneta', viewValue: 'Camioneta' },
    { value: 'Camion', viewValue: 'camion' },
    { value: 'Otros', viewValue: 'Otros' },
  ];
  marcas: { value: string; viewValue: string }[] = [
    { value: 'toyota', viewValue: 'Toyota' },
    { value: 'nissan', viewValue: 'Nissan' },
    { value: 'ford', viewValue: 'Ford' },
    { value: 'chevrolet', viewValue: 'Chevrolet' },
    { value: 'honda', viewValue: 'Honda' },
    { value: 'bmw', viewValue: 'BMW' },
    { value: 'volkswagen', viewValue: 'Volkswagen' },
    { value: 'Otros', viewValue: 'Otros' },
  ];
  tamanio: { value: string; viewValue: string }[] = [
    { value: 'Pequeño', viewValue: 'Pequeño' },
    { value: 'Mediano', viewValue: 'Mediano' },
    { value: 'Grande', viewValue: 'Grande' },
    { value: 'Otros', viewValue: 'Otros' },
  ];

  imageSelected: string | ArrayBuffer | null = null;

  constructor(
    private vS: VehiculoService,
    private router: Router,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      placaVehiculo: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(/^[A-Z]{2}[0-9]{4}$/),
        ],
      ],
      categoriaVehiculo: ['', Validators.required],
      colorVehiculo: [this.colorSeleccionado, Validators.required],
      marcaVehiculo: ['', Validators.required],
      tamanioVehiculo: ['', Validators.required],
      tarjetaPropiedadVehiculo: [
        '',
        [Validators.required, tarjetaPropiedadValidator()],
      ],
      foto: ['', Validators.required],
    });
  }

  registrar() {
    if (this.form.valid) {
      this.vehiculo.idVehiculo = this.form.value.idVehiculo;
      this.vehiculo.placaVehiculo = this.form.value.placaVehiculo;
      this.vehiculo.categoriaVehiculo = this.form.value.categoriaVehiculo;
      this.vehiculo.colorVehiculo = this.form.value.colorVehiculo;
      this.vehiculo.marcaVehiculo = this.form.value.marcaVehiculo;
      this.vehiculo.tamanioVehiculo = this.form.value.tamanioVehiculo;
      this.vehiculo.tarjetaPropiedadVehiculo =
        this.form.value.tarjetaPropiedadVehiculo;
      this.vehiculo.imagenVehiculo = this.form.value.foto;

      if (this.edicion) {
        this.vS.update(this.vehiculo).subscribe(() => {
          this.vS.list().subscribe((data) => {
            this.vS.setList(data);
          });
        });
      } else {
        this.vS.insert(this.vehiculo).subscribe((data) => {
          this.vS.list().subscribe((data) => {
            this.vS.setList(data);
          });
        });
        alert('Se registro correctamente');
      }
      this.router.navigate(['components/vehiculos/listar_admin_vehiculos']);
    } else {
      // Handle incomplete form
      this.mensaje = '¡Completa todos los campos!';
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = () => {
          // Obtener solo el contenido base64 sin la información adicional
          const base64Content = reader.result?.toString().split(',')[1];

          if (base64Content) {
            this.form.get('foto')?.setValue(base64Content);
          } else {
            console.log('Error extracting base64 content from the image.');
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.log('The selected file is not an image.');
      }
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control not found for the field ${nombreCampo}`);
    }
    return control;
  }
  colorcito(event: any) {
    this.colorSeleccionado = event.color.hex; // Actualiza el color seleccionado
    this.form.get('colorVehiculo')?.setValue(this.colorSeleccionado); // Actualiza el valor en el formulario
  }

  init() {
    if (this.edicion) {
      this.vS.getById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idVehiculo: new FormControl(data.idVehiculo),
          placaVehiculo: new FormControl(data.placaVehiculo),
          categoriaVehiculo: new FormControl(data.categoriaVehiculo),
          colorVehiculo: new FormControl(data.colorVehiculo),
          marcaVehiculo: new FormControl(data.marcaVehiculo),
          tamanioVehiculo: new FormControl(data.tamanioVehiculo),
          tarjetaPropiedadVehiculo: new FormControl(
            data.tarjetaPropiedadVehiculo
          ),
          imagenVehiculo: new FormControl(data.imagenVehiculo),
        });
        this.imageSelected = data.imagenVehiculo; // Guarda la URL de la imagen
      });
    }
  }
}
