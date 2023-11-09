import { Injectable } from '@angular/core';
import { HorarioEstacionamiento } from '../models/horarioEstacionamiento';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class HorarioEstacionamientoService {
  private url = `${base_url}/horarioEstacionamientos`;
  private listaCambio = new Subject<HorarioEstacionamiento[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los Horarios
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<HorarioEstacionamiento[]>(`${this.url}/Listar`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Obtener un hrsEst por ID
  getById(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<HorarioEstacionamiento>(
      `${this.url}/ListarporID/${id}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
  // Actualizar un hrsEst
  update(est: HorarioEstacionamiento) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/Modificar`, est, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Eliminar un hrsEst
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/Eliminar/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Crear un nuevo hrsEst
  insert(hrsEst: HorarioEstacionamiento) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/Registrar`, hrsEst, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: HorarioEstacionamiento[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
