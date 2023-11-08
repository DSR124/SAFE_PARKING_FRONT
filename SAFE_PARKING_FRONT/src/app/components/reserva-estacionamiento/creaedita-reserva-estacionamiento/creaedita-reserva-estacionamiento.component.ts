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
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idReservaEstacionamiento: [''],
      estado: ['', Validators.required],
      favorito: ['', Validators.required],
      fecha: ['', Validators.required],
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
      } else {
        this.reS.insert(this.reservaestacionamiento).subscribe((data) => {
          this.reS.list().subscribe((data) => {
            this.reS.setList(data);
          });
        });
      }
      this.router.navigate([
        'reservaestacionamiento/listar_admin_reserva_estacionamientos',
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
        this.form = new FormGroup({
          idReservaEstacionamiento: new FormControl(
            data.idReservaEstacionamiento
          ),
          estado: new FormControl(data.estado),
          favorito: new FormControl(data.favorito),
          fecha: new FormControl(data.fecha),
          users: new FormControl(data.users),
          vehiculo: new FormControl(data.vehiculo),
          horarioEstacionamiento: new FormControl(data.horarioEstacionamiento),
        });
      });
    }
  }
}
