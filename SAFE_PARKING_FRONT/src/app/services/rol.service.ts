import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_datos;

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los vehículos
  list() {
    return this.http.get<Rol[]>(`${this.url}/Listar`);
  }
  // Obtener un Membresia por ID
  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/ListarporID/${id}`);
  }
  // Actualizar un Membresia
  update(vehiculo: Rol) {
    return this.http.put(`${this.url}/Modificar`, vehiculo);
  }
  // Eliminar un Membresia
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  // Crear un nuevo Membresia
  insert(me: Rol) {
    return this.http.post(`${this.url}/Registrar`, me);
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
