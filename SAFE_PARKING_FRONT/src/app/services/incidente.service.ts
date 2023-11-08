import { Injectable } from '@angular/core';
import { Incidente } from '../models/incidente';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class IncidenteService {
  private url = `${base_url}/incidentes`;
  private listaCambio = new Subject<Incidente[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los Incidente
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Incidente[]>(`${this.url}/Listar`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Obtener un Incidente por ID
  getById(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Incidente>(`${this.url}/ListarporID/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Actualizar un Incidente
  update(est: Incidente) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/Modificar`, est, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Eliminar un Incidente
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/Eliminar/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Crear un nuevo Incidente
  insert(inc: Incidente) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/Registrar`, inc, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Incidente[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
