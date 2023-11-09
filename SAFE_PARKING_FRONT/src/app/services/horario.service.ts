import { Injectable } from '@angular/core';
import { Horario } from '../models/horario';

import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Localizacion } from '../models/localizacion';
const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private url = `${base_url}/horarios`;
  private listaCambio = new Subject<Horario[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los Horarios
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Horario[]>(`${this.url}/Listar`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Obtener un horario por ID
  getById(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Horario>(`${this.url}/ListarporID/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Actualizar un horario
  update(est: Horario) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/Modificar`, est, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Eliminar un horario
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/Eliminar/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Crear un nuevo hrsEst
  insert(hr: Horario) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/Registrar`, hr, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Horario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
