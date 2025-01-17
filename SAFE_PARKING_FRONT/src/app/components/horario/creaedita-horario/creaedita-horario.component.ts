import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from 'src/app/services/horario.service';
import { ActivatedRoute, Params } from '@angular/router';

import * as moment from 'moment';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-creaedita-horario',
  templateUrl: './creaedita-horario.component.html',
  styleUrls: ['./creaedita-horario.component.css'],
})
export class CreaeditaHorarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  minFecha: Date = moment().add(-0, 'days').toDate();
  horario: Horario = new Horario();
  mensaje: string = '';
  //minFecha: Date = moment().add(-0, 'days').toDate();
  id: number = 0; //Añadir
  edicion: boolean = false; //Añadir
  role: string = '';

  constructor(
    private hS: HorarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idHorario: [''],
      horaApertura: ['', Validators.required],
      horaCierre: ['', Validators.required],
      fecha: ['', Validators.required],
    });
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
  registrar(): void {
    if (this.form.valid) {
      this.horario.idHorario = this.form.value.idHorario;
      this.horario.horaApertura = this.form.value.horaApertura;
      this.horario.horaCierre = this.form.value.horaCierre;
      this.horario.fecha = this.form.value.fecha;
      if (this.edicion) {
        this.hS.update(this.horario).subscribe(() => {
          this.hS.list().subscribe((data) => {
            this.hS.setList(data);
          });
        });
        alert('La modificación se hizo correctamente');
        this.router.navigate(['components/horarios/listar_admin_horarios']);
      } else {
        this.hS.insert(this.horario).subscribe((data) => {
          this.hS.list().subscribe((data) => {
            this.hS.setList(data);
          });
        });
        alert('El registro se hizo correctamente');
        this.ngOnInit();
      }
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
      this.hS.getById(this.id).subscribe((data) => {
        this.form.patchValue({
          idHorario: data.idHorario,
          horaApertura: data.horaApertura,
          horaCierre: data.horaCierre,
          fecha: data.fecha
        });
      });
    }
  }

  // Función para manejar el cambio de tiempo y convertir el formato
  handleTimeSelection(event: any, controlName: string) {
    const tiempoSeleccionado = event.value; // Aquí obtienes el tiempo seleccionado

    // Conviertes el formato del tiempo
    const tiempoFormato24h = this.convertirFormato12a24(tiempoSeleccionado);

    // Luego, asigna este valor convertido al atributo que deseas en tu formulario
    this.form.get(controlName)?.patchValue(tiempoFormato24h);
  }

  convertirFormato12a24(tiempo12h: string): string {
    const [hora, minutos, periodo] = tiempo12h.split(/: | /);
    let horaNum = parseInt(hora, 10);

    if (periodo === 'PM' && horaNum !== 12) {
      horaNum += 12;
    } else if (periodo === 'AM' && horaNum === 12) {
      horaNum = 0;
    }

    const hora24h = horaNum.toString().padStart(2, '0');
    return `${hora24h}:${minutos}`;
  }

  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
}
