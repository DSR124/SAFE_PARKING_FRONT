import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Membresia } from '../models/membresia';

const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class MembresiaService {
  private url = `${base_url}/membresias`;
  private listaCambio = new Subject<Membresia[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los Membresia
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Membresia[]>(`${this.url}/Listar`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Obtener un Membresia por ID
  getById(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Membresia>(`${this.url}/ListarporID/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Actualizar un Membresia
  update(memb: Membresia) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/Modificar`, memb, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Eliminar un Membresia
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/Eliminar/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Crear un nuevo Membresia
  insert(inc: Membresia) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/Registrar`, inc, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Membresia[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
