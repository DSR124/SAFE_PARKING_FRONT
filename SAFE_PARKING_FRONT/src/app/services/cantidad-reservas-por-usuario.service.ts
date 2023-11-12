import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CantidadReservasPorUsuario } from '../models/cantidadReservasPorUsuario';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base_datos; // Ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class CantidadReservasPorUsuarioService {
  private url = `${base_url}/ReservaEstacionamientos`;

  private listaCambio = new Subject<CantidadReservasPorUsuario[]>();

  constructor(private http: HttpClient) {}

  CantidadReservasPorUsuario(): Observable<CantidadReservasPorUsuario[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<CantidadReservasPorUsuario[]>(
      `${this.url}/cantidadReservaPorusuario`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }

  setList(listaNueva: CantidadReservasPorUsuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<CantidadReservasPorUsuario[]> {
    return this.listaCambio.asObservable();
  }
}
