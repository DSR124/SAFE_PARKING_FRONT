import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Localizacion } from '../models/localizacion';

const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class LocalizacionService {
  private url = `${base_url}/localizaciones`;
  private listaCambio = new Subject<Localizacion[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los Localizacion
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Localizacion[]>(`${this.url}/Listar`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Obtener un Localizacion por ID
  getById(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Localizacion>(`${this.url}/ListarporID/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Actualizar un Localizacion
  update(lcz: Localizacion) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/Modificar`, lcz, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Eliminar un Localizacion
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/Eliminar/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Crear un nuevo Localizacion
  insert(inc: Localizacion) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/Registrar`, inc, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Localizacion[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
