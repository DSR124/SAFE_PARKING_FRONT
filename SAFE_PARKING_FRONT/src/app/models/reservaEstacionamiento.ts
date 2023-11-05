import { ReservaEstacionamientoService } from './../services/reserva-estacionamiento.service';
import { HorarioEstacionamiento } from './horarioEstacionamiento';
import { Usuario } from './usuario';
import { Vehiculo } from './vehiculo';

export class ReservaEstacionamiento {
    idReservaEstacionamiento: number = 0;
    estado: string = '';
    favorito: boolean = true;
    fecha: Date = new Date(Date.now());
    users: Usuario = new Usuario();
    vehiculo: Vehiculo = new Vehiculo();
    horarioEstacionamiento: HorarioEstacionamiento = new HorarioEstacionamiento();
}
  