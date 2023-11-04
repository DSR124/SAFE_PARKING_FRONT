import { Injectable } from '@angular/core';
import { Incidente } from '../models/incidente';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {

  private url = `${base_url}/incidentes`;
  private listaCambio = new Subject<Incidente[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los incidentes
  list() {
    return this.http.get<Incidente[]>(`${this.url}/Listar`);
  }
  // Obtener una incidencia por ID
  getById(id: number) {
    return this.http.get<Incidente>(`${this.url}/ListarporID/${id}`);
  }
  // Actualizar Incidente
  update(incidente: Incidente) {
    return this.http.put(`${this.url}/Modificar`, incidente);
  }
  // Eliminar incidente
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  // Crear un nuevo Incidente
  insert(i: Incidente) {
    return this.http.post(`${this.url}/Registrar`, i);
  }

  setList(listaNueva: Incidente[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
