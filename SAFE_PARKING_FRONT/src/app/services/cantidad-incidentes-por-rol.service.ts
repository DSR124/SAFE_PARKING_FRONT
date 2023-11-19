import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CantidadIncidentesPorRol } from '../models/cantidadIncidentesPorRol';
const base_url = environment.base_datos; // Ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class CantidadIncidentesPorRolService {
  private url = `${base_url}/incidentes`;

  private listaCambio = new Subject<CantidadIncidentesPorRol[]>();

  constructor(private http: HttpClient) {}

  CantidadIncidentesPorRol(): Observable<CantidadIncidentesPorRol[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<CantidadIncidentesPorRol[]>(
      `${this.url}/CantidadIncidentesPorRol`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }

  setList(listaNueva: CantidadIncidentesPorRol[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<CantidadIncidentesPorRol[]> {
    return this.listaCambio.asObservable();
  }
}
