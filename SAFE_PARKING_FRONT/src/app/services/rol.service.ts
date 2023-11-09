import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base_datos;

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los Rol
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Rol[]>(`${this.url}/Listar`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Obtener un Rol por ID
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Rol>(`${this.url}/ListarporID/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Actualizar un Rol
  update(memb: Rol) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/Modificar`, memb, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Eliminar un Rol
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/Eliminar/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Crear un nuevo Rol
  insert(rol: Rol) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/Registrar`, rol, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
