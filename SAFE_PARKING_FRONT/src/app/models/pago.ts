import { ReservaEstacionamiento } from './reservaEstacionamiento';
export class Membresia {
    idPago: number = 0;
    fechaEmision: Date = new Date(Date.now());
    precioTotal: number = 0;
    tipoPago: string = '';
    reservaEstacionamiento: ReservaEstacionamiento = new ReservaEstacionamiento()
  }
  