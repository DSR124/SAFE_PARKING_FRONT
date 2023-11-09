import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creaedita-rol',
  templateUrl: './creaedita-rol.component.html',
  styleUrls: ['./creaedita-rol.component.css'],
})
export class CreaeditaRolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  mensaje: string = '';
  listaUsuarios: Usuario[] = [];

  //Para edicion
  edicion: boolean = false;
  id: number = 0;

  tipoRol: { value: string; viewValue: string }[] = [
    { value: 'administrador', viewValue: 'Administrador' },
    { value: 'conductor', viewValue: 'Conductor' },
    { value: 'arrendador', viewValue: 'Arrendador' },
  ];

  constructor(
    private rS: RolService,
    private uS: UsuarioService,
    private router: Router, //Para Navegar
    private formBuilder: FormBuilder, //private route: ActivatedRoute //Para editar
    private route: ActivatedRoute //Para editar
  ) {}

  ngOnInit(): void {
    //Nuevo Para Editar
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idRol: [''], //Para editar debe ser asi
      nombreRol: ['', Validators.required],
      usuario: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rol.idRol = this.form.value.idRol; //Se agrega
      this.rol.nombreRol = this.form.value.nombreRol;
      this.rol.usuario.idUsuario = this.form.value.usuario; //dessert.idDessert -> Se utiliza el ID por que desde la BD se maneja con ello

      if (this.edicion) {
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        //Pasamos un objeto del tipo Ingredient por que en el Service fue declarado asi
        this.rS.insert(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['components/roles/listar-admin-roles']); //Esta ruta la sacamos del ROUTING MODULE
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
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idRol: new FormControl(data.idRol),
          nombreRol: new FormControl(data.nombreRol),
          usuario: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
}
