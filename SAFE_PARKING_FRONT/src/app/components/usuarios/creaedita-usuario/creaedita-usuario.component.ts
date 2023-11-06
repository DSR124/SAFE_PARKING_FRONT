import { Component, OnInit } from '@angular/core';
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
  fechaNacimiento = new FormControl(new Date());
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;
  imageSelected: string | ArrayBuffer | null = null;
  imagenCortada: string = '';
  listaMembresia: Membresia[] = [];

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idUsuario: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      genero: ['', Validators.required],
      dni: ['', Validators.required],
      imagen: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required]],
      telefono: ['', Validators.required],
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
      this.usuario.password = this.form.value.password;
      this.usuario.genero = this.form.value.genero;
      this.usuario.dni = this.form.value.dni;
      this.usuario.imagen = this.form.value.imagen;
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
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }

      this.router.navigate(['usuarios/listar_admin_usuarios']);
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
          this.imageSelected = reader.result;

          if (typeof this.imageSelected === 'string') {
            this.imagenCortada = this.imageSelected.substring(0, 50);
            this.form.get('imagen')?.setValue(this.imagenCortada); // Actualiza el valor en el formulario

            console.log('Partial image data:', this.imagenCortada);
          } else {
            console.log('Image has not loaded as a string');
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
}
