import { Injectable } from '@angular/core';
import { Horario } from '../models/horario';

import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Horario[]>(`${this.url}/Listar`);
  }
  setList(listaNueva: Horario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  // Obtener un Horario por ID
  listId(id: number) {
    return this.http.get<Horario>(`${this.url}/ListarporID/${id}`);
  }
  // Actualizar un Horario
  update(horario: Horario) {
    return this.http.put(`${this.url}/Modificar`, horario);
  }
  // Eliminar un Horario
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  // Crear un nuevo Horario
  insert(lc: Horario) {
    return this.http.post(`${this.url}/Registrar`, lc);
  }
}
