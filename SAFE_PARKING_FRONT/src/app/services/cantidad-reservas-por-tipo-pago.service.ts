import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CantidadReservasPorFecha } from '../models/cantidadReservasPorFecha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { CantidadReservasPorTipoPago } from '../models/cantidadReservasPorTipoPago';
const base_url = environment.base_datos; // Ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class CantidadReservasPorTipoPagoService {
  private url = `${base_url}/ReservaEstacionamientos`;

  private listaCambio = new Subject<CantidadReservasPorTipoPago[]>();

  constructor(private http: HttpClient) {}

  CantidadReservasPorTipoPago(): Observable<CantidadReservasPorTipoPago[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<CantidadReservasPorTipoPago[]>(
      `${this.url}/cantidadReservaPorTipoDePago`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }

  setList(listaNueva: CantidadReservasPorTipoPago[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<CantidadReservasPorTipoPago[]> {
    return this.listaCambio.asObservable();
  }
}
