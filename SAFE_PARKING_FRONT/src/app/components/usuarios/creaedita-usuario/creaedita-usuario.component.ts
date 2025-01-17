import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as moment from 'moment';
import { Membresia } from 'src/app/models/membresia';
import { MembresiaService } from 'src/app/services/membresia.service';
import * as bcrypt from 'bcryptjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaedita-usuario',
  templateUrl: './creaedita-usuario.component.html',
  styleUrls: ['./creaedita-usuario.component.css'],
})
export class CreaeditaUsuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  estado: boolean = true;
  mensaje: string = '';
  mostrarCampo: boolean = false; // O ajusta esto según tus necesidades

  fechaNacimiento = new FormControl(new Date());
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;
  imageSelected: string | ArrayBuffer | null = null;
  imagenCortada: string = '';
  listaMembresia: Membresia[] = [];
  hide: boolean = true; // or initialize it as per your requirement

  generos: { value: string; viewValue: string }[] = [
    { value: 'Hombre', viewValue: 'Hombre' },
    { value: 'Mujer', viewValue: 'Mujer' },
    { value: 'Otros', viewValue: 'Otros' },
  ];
  constructor(
    private uS: UsuarioService,
    private mS: MembresiaService, // Asumiendo que tienes un servicio para Membresia
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef // Add this line
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
      password: ['', [Validators.required, Validators.maxLength(200)]],
      genero: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      foto: [''],
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
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.correo = this.form.value.correo;
      this.usuario.username = this.form.value.username;
      const plainPassword = this.form.value.password; // Obtén la contraseña ingresada por el usuario desde el formulario

      // Hash de la contraseña
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(plainPassword, salt, (err, hash) => {
          if (!err) {
            // Aquí 'hash' contendrá la contraseña hasheada, guárdala en tu objeto 'usuario'
            this.usuario.password = hash;

            this.usuario.genero = this.form.value.genero;
            this.usuario.dni = this.form.value.dni;
            this.usuario.imagen = this.form.value.foto;
            this.usuario.fechaNacimiento = this.form.value.fechaNacimiento;
            this.usuario.telefono = this.form.value.telefono;
            this.usuario.membresia.idMembresia = this.form.value.membresia;
            this.usuario.enabled = this.estado;

            if (this.edicion) {
              this.uS.update(this.usuario).subscribe(() => {
                this.uS.list().subscribe((data) => {
                  this.uS.setList(data);
                });
              });
              this.router.navigate([
                'components/usuarios/listar_admin_usuarios',
              ]);
            } else {
              this.uS.insert(this.usuario).subscribe((data) => {
                this.uS.list().subscribe((data) => {
                  this.uS.setList(data);
                });
              });
              this._snackBar.open('Registro exitoso', 'Cerrar', {
                duration: 5000, // Duración en milisegundos
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.ngOnInit();
            }
          } else {
            // Manejo de error
            console.error(err);
          }
        });
      });
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
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

  init() {
    if (this.edicion) {
      this.uS.getById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUsuario: new FormControl(data.idUsuario),
          nombre: new FormControl(data.nombre),
          apellido: new FormControl(data.apellido),
          correo: new FormControl(data.correo),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          genero: new FormControl(data.genero),
          dni: new FormControl(data.dni),
          imagen: new FormControl(data.imagen),
          fechaNacimiento: new FormControl(data.fechaNacimiento),
          telefono: new FormControl(data.telefono),
          membresia: new FormControl(data.membresia.idMembresia),
          enabled: new FormControl(data.enabled),
        });
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
