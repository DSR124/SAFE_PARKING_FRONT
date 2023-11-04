import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Membresia } from '../models/membresia';

const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class MembresiaService {
  private url = `${base_url}/membresias`;
  private listaCambio = new Subject<Membresia[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los vehículos
  list() {
    return this.http.get<Membresia[]>(`${this.url}/Listar`);
  }
  // Obtener un Membresia por ID
  getById(id: number) {
    return this.http.get<Membresia>(`${this.url}/ListarporID/${id}`);
  }
  // Actualizar un Membresia
  update(membresia: Membresia) {
    return this.http.put(`${this.url}/Modificar`, membresia);
  }
  // Eliminar un Membresia
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  // Crear un nuevo Membresia
  insert(me: Membresia) {
    return this.http.post(`${this.url}/Registrar`, me);
  }

  setList(listaNueva: Membresia[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
