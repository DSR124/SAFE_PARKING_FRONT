import { Injectable } from '@angular/core';
import { ReservaEstacionamiento } from '../models/reservaEstacionamiento';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class ReservaEstacionamientoService {
  private url = `${base_url}/ReservaEstacionamientos`;
  private listaCambio = new Subject<ReservaEstacionamiento[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<ReservaEstacionamiento[]>(`${this.url}/Listar`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Obtener un ReservaEstacionamiento por ID
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<ReservaEstacionamiento>(
      `${this.url}/ListarporID/${id}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
  // Actualizar un ReservaEstacionamiento
  update(memb: ReservaEstacionamiento) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/Modificar`, memb, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Eliminar un ReservaEstacionamiento
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/Eliminar/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Crear un nuevo ReservaEstacionamiento
  insert(resESt: ReservaEstacionamiento) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/Registrar`, resESt, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: ReservaEstacionamiento[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  /*Añadir funciones de queries - Serian 3*/
}
