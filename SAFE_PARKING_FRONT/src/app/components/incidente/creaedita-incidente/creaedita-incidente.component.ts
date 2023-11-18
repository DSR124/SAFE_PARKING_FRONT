import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Incidente } from 'src/app/models/incidente';
import { IncidenteService } from 'src/app/services/incidente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-creaedita-incidente',
  templateUrl: './creaedita-incidente.component.html',
  styleUrls: ['./creaedita-incidente.component.css'],
})
export class CreaeditaIncidenteComponent {
  form: FormGroup = new FormGroup({});
  incidente: Incidente = new Incidente();
  mensaje: string = '';
  listaUsuarios: Usuario[] = [];
  id: number = 0;
  edicion: boolean = false;
  role: string = '';

  tiposIncidentes: { value: string; viewValue: string }[] = [
    { value: 'Daño al vehículo', viewValue: 'Daño al vehículo' },
    { value: 'Robo o vandalismo', viewValue: 'Robo o vandalismo' },
    { value: 'Problemas de pago', viewValue: 'Problemas de pago' },
    {
      value: 'Accidente en el aparcamiento',
      viewValue: 'Accidente en el aparcamiento',
    },
    { value: 'Problemas de seguridad', viewValue: 'Problemas de seguridad' },
    { value: 'Vehículo bloqueado', viewValue: 'Vehículo bloqueado' },
    {
      value: 'Problemas con la reserva',
      viewValue: 'Problemas con la reserva',
    },
    { value: 'Infracción de tráfico', viewValue: 'Infracción de tráfico' },
    { value: 'Otros', viewValue: 'Otros' },
  ];

  constructor(
    private iS: IncidenteService,
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
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
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      tipoIncidente: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  registrar() {
    if (this.form.valid) {
      this.incidente.idIncidente = this.form.value.idIncidente;
      this.incidente.descripcion = this.form.value.descripcion;
      this.incidente.tipoIncidente = this.form.value.tipoIncidente;
      this.incidente.usuario.idUsuario = this.form.value.usuario;
      if (this.edicion) {
        this.iS.update(this.incidente).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
        alert('la modificacion se hizo correctamente');
      } else {
        this.iS.insert(this.incidente).subscribe((data) => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
        alert('El registro se hizo correctamente');
        this.ngOnInit();
      }
    } else {
      this.mensaje = 'Complete todos los campos!!!';
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
      this.iS.getById(this.id).subscribe((data) => {
        this.form.patchValue({
          idIncidente: data.idIncidente,
          descripcion: data.descripcion,
          tipoIncidente: data.tipoIncidente,
          usuario: data.usuario.idUsuario,
        });
      });
    }
  }
}
