import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { HorarioEstacionamiento } from 'src/app/models/horarioEstacionamiento';
import { ReservaEstacionamiento } from 'src/app/models/reservaEstacionamiento';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculo } from 'src/app/models/vehiculo';
import { HorarioEstacionamientoService } from 'src/app/services/horario-estacionamiento.service';
import { LoginService } from 'src/app/services/login.service';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-creaedita-reserva-estacionamiento',
  templateUrl: './creaedita-reserva-estacionamiento.component.html',
  styleUrls: ['./creaedita-reserva-estacionamiento.component.css'],
})
export class CreaeditaReservaEstacionamientoComponent {
  form: FormGroup = new FormGroup({});
  reservaestacionamiento: ReservaEstacionamiento = new ReservaEstacionamiento();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  listaUsuario: Usuario[] = [];
  listaVehiculo: Vehiculo[] = [];
  listaHorarioEst: HorarioEstacionamiento[] = [];
  estadoregistro: string = 'En Proceso';
  role: string = '';
  id: number = 0;
  edicion: boolean = false;

  favoritos: { value: string; viewValue: string }[] = [
    { value: 'true', viewValue: 'true' },
    { value: 'false', viewValue: 'false' },
  ];
  estado: { value: string; viewValue: string }[] = [
    { value: 'En proceso', viewValue: 'En Proceso' },
    { value: 'Completado', viewValue: 'Completado' },
  ];
  constructor(
    private reS: ReservaEstacionamientoService,
    private uS: UsuarioService, // Asumiendo que tienes un servicio para Membresia
    private vS: VehiculoService,
    private heS: HorarioEstacionamientoService,
    private formBuilder: FormBuilder,
    private router: Router,
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
      idReservaEstacionamiento: [''],
      estado: [this.estadoregistro, Validators.required],
      favorito: ['', Validators.required],
      fecha: [new Date(), Validators.required],
      users: ['', Validators.required],
      vehiculo: ['', Validators.required],
      horarioEstacionamiento: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
    this.vS.list().subscribe((data) => {
      this.listaVehiculo = data;
    });
    this.heS.list().subscribe((data) => {
      this.listaHorarioEst = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.reservaestacionamiento.idReservaEstacionamiento =
        this.form.value.idReservaEstacionamiento;
      this.reservaestacionamiento.estado = this.form.value.estado;
      this.reservaestacionamiento.favorito = this.form.value.favorito;
      this.reservaestacionamiento.fecha = this.form.value.fecha;
      this.reservaestacionamiento.users.idUsuario = this.form.value.users;
      this.reservaestacionamiento.vehiculo.idVehiculo =
        this.form.value.vehiculo;
      this.reservaestacionamiento.horarioEstacionamiento.idHorarioEstacionamiento =
        this.form.value.horarioEstacionamiento;
      if (this.edicion) {
        this.reS.update(this.reservaestacionamiento).subscribe(() => {
          this.reS.list().subscribe((data) => {
            this.reS.setList(data);
          });
        });
        alert('Se modificó correctamente');
      } else {
        this.reS.insert(this.reservaestacionamiento).subscribe((data) => {
          this.reS.list().subscribe((data) => {
            this.reS.setList(data);
          });
        });
        alert('Se registró correctamente');
      }
      this.router.navigate([
        'components/reservaestacionamiento/listar_admin_reserva_estacionamientos',
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
      this.reS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idReservaEstacionamiento: data.idReservaEstacionamiento,
          estado: data.estado,
          favorito: data.favorito,
          fecha: data.fecha,
          users: data.users,
          vehiculo: data.vehiculo,
          horarioEstacionamiento: data.horarioEstacionamiento,
        });
      });
    }
  }

  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
}
