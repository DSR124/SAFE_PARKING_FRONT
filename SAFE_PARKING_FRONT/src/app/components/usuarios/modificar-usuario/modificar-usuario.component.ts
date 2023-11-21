import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as moment from 'moment';
import { Membresia } from 'src/app/models/membresia';
import { MembresiaService } from 'src/app/services/membresia.service';
import * as bcrypt from 'bcryptjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css'],
})
export class ModificarUsuarioComponent implements OnInit {
  hide: boolean = true; // Declaración de la propiedad 'hide'

  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  estado: boolean = true;
  mensaje: string = '';

  fechaNacimiento = new FormControl(new Date());
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;
  imageSelected: string | ArrayBuffer | null = null;
  listaMembresia: Membresia[] = [];
  mostrarCampo: boolean = false; // O ajusta esto según tus necesidades

  generos: { value: string; viewValue: string }[] = [
    { value: 'Hombre', viewValue: 'Hombre' },
    { value: 'Mujer', viewValue: 'Mujer' },
    { value: 'Otros', viewValue: 'Otros' },
  ];

  constructor(
    private uS: UsuarioService,
    private mS: MembresiaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idUsuario: [''],
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/),
          Validators.maxLength(50),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/),
          Validators.maxLength(50),
        ],
      ],
      correo: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.email,
          Validators.pattern(/\..*/),
        ],
      ],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: [''],
      genero: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      foto: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      membresia: ['', Validators.required],
    });
    this.mS.list().subscribe((data) => {
      this.listaMembresia = data;
    });
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  aceptar(): void {
    if (this.form.valid) {
      if (this.edicion) {
        this.usuario.idUsuario = this.form.value.idUsuario;
        this.usuario.nombre = this.form.value.nombre;
        this.usuario.apellido = this.form.value.apellido;
        this.usuario.correo = this.form.value.correo;
        this.usuario.username = this.form.value.username;
        this.usuario.genero = this.form.value.genero;
        this.usuario.dni = this.form.value.dni;
        this.usuario.imagen = this.form.value.foto;
        this.usuario.fechaNacimiento = this.form.value.fechaNacimiento;
        this.usuario.telefono = this.form.value.telefono;
        this.usuario.membresia.idMembresia = this.form.value.membresia;
        this.usuario.enabled = this.estado;
        this.usuario.password = this.form.value.password;
        // Hash de la contraseña
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });

          // Navegar después de la actualización

          this.router.navigate(['components/usuarios/listar_admin_usuarios']);
        });
      }
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
            this.cdr.detectChanges();
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

  init() {
    if (this.edicion) {
      this.uS.getById(this.id).subscribe((data) => {
        this.form.patchValue({
          idUsuario: data.idUsuario,
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          username: data.username,
          genero: data.genero,
          dni: data.dni,
          foto: data.imagen,
          password: data.password,
          fechaNacimiento: data.fechaNacimiento,
          telefono: data.telefono,
          membresia: data.membresia.idMembresia,
        });
        this.imageSelected = data.imagen;
      });
    }
  }

  imagenNoCargada(event: Event) {
    const imagen = event.target as HTMLImageElement;
    imagen.src = 'assets/image/EstacionamientoDefault.jpg';
  }

  getImagenUrl(): string {
    if (this.imageSelected) {
      return 'data:image/jpeg;base64,' + this.imageSelected;
    } else {
      return 'assets/image/EstacionamientoDefault.jpg';
    }
  }

  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
}
