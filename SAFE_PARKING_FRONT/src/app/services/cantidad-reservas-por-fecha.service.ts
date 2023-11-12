import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CantidadReservasPorFecha } from '../models/cantidadReservasPorFecha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base_datos; // Ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class CantidadReservasPorFechaService {
  private url = `${base_url}/ReservaEstacionamientos`;

  private listaCambio = new Subject<CantidadReservasPorFecha[]>();

  constructor(private http: HttpClient) {}

  CantidadReservasPorFecha(): Observable<CantidadReservasPorFecha[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<CantidadReservasPorFecha[]>(
      `${this.url}/cantidadReservaPorFecha`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }

  setList(listaNueva: CantidadReservasPorFecha[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<CantidadReservasPorFecha[]> {
    return this.listaCambio.asObservable();
  }
}
