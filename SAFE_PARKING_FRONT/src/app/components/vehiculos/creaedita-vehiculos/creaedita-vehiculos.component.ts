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
import { ChangeDetectorRef } from '@angular/core';

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
    public route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Add this line
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idVehiculo: [''], // ¡Este campo debería inicializarse con el valor correcto!

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
        alert('Se modificó correctamente');
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
          const base64Content = reader.result?.toString().split(',')[1];

          if (base64Content) {
            this.form.get('foto')?.setValue(base64Content);
            this.imageSelected = base64Content;
            this.cdr.detectChanges(); // Trigger change detection
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
        this.form.setValue({
          idVehiculo: data.idVehiculo, // Asigna el valor correcto aquí
          placaVehiculo: data.placaVehiculo,
          categoriaVehiculo: data.categoriaVehiculo,
          colorVehiculo: data.colorVehiculo,
          marcaVehiculo: data.marcaVehiculo,
          tamanioVehiculo: data.tamanioVehiculo,
          tarjetaPropiedadVehiculo: data.tarjetaPropiedadVehiculo,
          foto: data.imagenVehiculo,
        });

        this.imageSelected = data.imagenVehiculo; // Guarda la URL de la imagen
      });
    }
  }

  imagenNoCargada(event: Event) {
    const imagen = event.target as HTMLImageElement;
    imagen.src = 'assets/image/EstacionamientoDefault.jpg'; // Ruta de otra imagen predeterminada o un mensaje de error
  }
  getImagenUrl(): string {
    console.log('imageSelected:', this.imageSelected);
    if (this.imageSelected) {
      return 'data:image/jpeg;base64,' + this.imageSelected;
    } else {
      return 'assets/image/EstacionamientoDefault.jpg';
    }
  }
}
