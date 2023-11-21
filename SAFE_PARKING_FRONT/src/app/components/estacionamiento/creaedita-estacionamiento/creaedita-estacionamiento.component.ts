import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { LoginService } from 'src/app/services/login.service';

function precioPositivo(
  control: AbstractControl
): Promise<{ [key: string]: any } | null> {
  return new Promise((resolve) => {
    const precio = control.value;
    if (precio <= 0) {
      resolve({ precioMenorOIgualACero: true });
    } else {
      resolve(null);
    }
  });
}

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
  role: string = '';

  id: number = 0; //Añadir
  edicion: boolean = false; //Añadir
  mostrarCampo: boolean = false; // O ajusta esto según tus necesidades

  tipos: { value: string; viewValue: string }[] = [
    {
      value: 'Estacionamiento Público Tradicional',
      viewValue: 'Estacionamiento Público Tradicional',
    },
    {
      value: 'Estacionamiento Privado Compartido',
      viewValue: 'Estacionamiento Privado Compartido',
    },
    {
      value: 'Estacionamiento Privado Domicilio',
      viewValue: 'Estacionamiento Privado Domicilio',
    },
    {
      value: 'Estacionamiento Temporal',
      viewValue: 'Estacionamiento Temporal',
    },
    {
      value: 'Estacionamiento Comunitario',
      viewValue: 'Estacionamiento Comunitario',
    },
    {
      value: 'Estacionamiento Accesible',
      viewValue: 'Estacionamiento Accesible',
    },
    {
      value: 'Estacionamiento Inteligente',
      viewValue: 'Estacionamiento Inteligente',
    },
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
    private loginService: LoginService,

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
      idEstacionamiento: [''],
      tipoEstacionamiento: ['', Validators.required],
      disponibilidad: [this.disponibilidad, Validators.required],
      foto: ['', Validators.required],
      promedioValoracion: [5, Validators.required],
      capacidad: ['', [Validators.required, Validators.pattern('^[^.]*$')], precioPositivo],
      fechaRegistro: [new Date(), Validators.required],
      precio: ['', Validators.required, precioPositivo],
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
        alert('Se modificó correctamente');
      } else {
        this.eS.insert(this.estacionamiento).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
        alert('Se registró correctamente');
        this.ngOnInit();
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
        this.form.patchValue({
          idEstacionamiento: data.idEstacionamiento,
          tipoEstacionamiento: data.tipoEstacionamiento,
          disponibilidad: data.disponibilidad,
          foto: data.foto,
          promedioValoracion: data.promedioValoracion,
          capacidad: data.capacidad,
          fechaRegistro: data.fechaRegistro,
          precio: data.precio,
          usuario: data.usuario.idUsuario,
          localizacion: data.localizacion.idLocalizacion,
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
  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol() {
    if (
      this.role == 'administrador' ||
      this.role == 'conductor' ||
      this.role == 'arrendador'
    ) {
      return true;
    } else {
      return false;
    }
  }

   //Para ocultar la barra

   mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

   toggleNavbar() {
     this.mostrarNavbar = !this.mostrarNavbar;
   }
   //Fin de ocultar la barra
}
