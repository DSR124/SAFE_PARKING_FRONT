import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { Localizacion } from 'src/app/models/localizacion';
import { Estacionamiento } from 'src/app/models/estacionamiento';
import { EstacionamientoService } from 'src/app/services/estacionamiento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LocalizacionService } from 'src/app/services/localizacion.service';

@Component({
  selector: 'app-creaedita-estacionamiento',
  templateUrl: './creaedita-estacionamiento.component.html',
  styleUrls: ['./creaedita-estacionamiento.component.css'],
})
export class CreaeditaEstacionamientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  estacionamiento: Estacionamiento = new Estacionamiento();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();

  id: number = 0; //Añadir
  edicion: boolean = false; //Añadir

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Publico', viewValue: 'Estacionamiento Público Tradicional' },
    { value: 'Privado', viewValue: 'Estacionamiento Privado Compartido' },
    {
      value: 'Privado-Domicilio',
      viewValue: 'Estacionamiento Privado Domicilio',
    },
    { value: 'Temporal', viewValue: 'Estacionamiento Temporal' },
    { value: 'Comunitario', viewValue: 'Estacionamiento Comunitario' },
    { value: 'Accesible', viewValue: 'Estacionamiento Accesible' },
    { value: 'Inteligente', viewValue: 'Estacionamiento Inteligente' },
    {
      value: 'Almacenamiento',
      viewValue: 'Estacionamiento para Almacenamiento a Largo Plazo',
    },
  ];

  tipo_disponibilidad: { value: string; viewValue: string }[] = [
    { value: 'Disponible', viewValue: 'Disponible' },
    { value: 'No disponible', viewValue: 'No disponible' },
  ];
  listaLocalizaciones: Localizacion[] = [];
  listaUsuario: Usuario[] = [];
  imageSelected: string | ArrayBuffer | null = null;
  imagenCortada: string = '';
  disponibilidad: string = 'Disponible';
  constructor(
    private eS: EstacionamientoService,
    private uS: UsuarioService, //Servides dependientes - añadir
    private lS: LocalizacionService, //Servides dependientes - añadir

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
      idEstacionamiento: [''],
      tipoEstacionamiento: ['', Validators.required],
      disponibilidad: [this.disponibilidad, Validators.required],
      foto: ['', Validators.required],
      promedioValoracion: [5, Validators.required],
      capacidad: ['', [Validators.required, Validators.pattern('^[^.]*$')]],
      fechaRegistro: [new Date(), Validators.required],
      precio: ['', Validators.required],
      usuario: ['', Validators.required],
      localizacion: ['', Validators.required],
    });

    //Importante para cargar las listas
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
    this.lS.list().subscribe((data) => {
      this.listaLocalizaciones = data;
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.estacionamiento.idEstacionamiento =
        this.form.value.idEstacionamiento;
      this.estacionamiento.tipoEstacionamiento =
        this.form.value.tipoEstacionamiento;
      this.estacionamiento.disponibilidad = this.form.value.disponibilidad;
      this.estacionamiento.foto = this.form.value.foto;
      this.estacionamiento.promedioValoracion =
        this.form.value.promedioValoracion;
      this.estacionamiento.capacidad = this.form.value.capacidad;
      this.estacionamiento.fechaRegistro = this.form.value.fechaRegistro;
      this.estacionamiento.precio = this.form.value.precio;
      this.estacionamiento.usuario.idUsuario = this.form.value.usuario;
      this.estacionamiento.localizacion.idLocalizacion =
        this.form.value.localizacion;

      if (this.edicion) {
        this.eS.update(this.estacionamiento).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.estacionamiento).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate([
        'components/estacionamiento/listar_admin_estacionamientos',
      ]);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idEstacionamiento: new FormControl(data.idEstacionamiento),
          tipoEstacionamiento: new FormControl(data.tipoEstacionamiento),
          disponibilidad: new FormControl(data.disponibilidad),
          foto: new FormControl(data.foto),
          promedioValoracion: new FormControl(data.promedioValoracion),
          capacidad: new FormControl(data.capacidad),
          fechaRegistro: new FormControl(data.fechaRegistro),
          precio: new FormControl(data.precio),
          usuario: new FormControl(data.usuario.idUsuario),
          localizacion: new FormControl(data.localizacion.idLocalizacion), //Tienes que referenciar al ID (en el segundo)
        });
      });
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
  
}
