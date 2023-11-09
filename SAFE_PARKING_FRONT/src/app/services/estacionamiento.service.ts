import { Estacionamiento } from '../models/estacionamiento';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_datos;
@Injectable({
  providedIn: 'root',
})
export class EstacionamientoService {
  private url = `${base_url}/estacionamientos`;
  private listaCambio = new Subject<Estacionamiento[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los comentarios
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Estacionamiento[]>(`${this.url}/Listar`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Obtener un est por ID
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Estacionamiento>(`${this.url}/ListarporID/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Actualizar un est
  update(est: Estacionamiento) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/Modificar`, est, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Eliminar un est
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/Eliminar/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Crear un nuevo est
  insert(com: Estacionamiento) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/Registrar`, com, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Estacionamiento[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
