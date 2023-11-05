import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';

const base_url = environment.base_datos;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los vehículos
  list() {
    return this.http.get<Usuario[]>(`${this.url}/Listar`);
  }
  // Obtener un Membresia por ID
  getById(id: number) {
    return this.http.get<Usuario>(`${this.url}/ListarporID/${id}`);
  }
  // Actualizar un Membresia
  update(usuario: Usuario) {
    return this.http.put(`${this.url}/Modificar`, usuario);
  }
  // Eliminar un Membresia
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  // Crear un nuevo Membresia
  insert(me: Usuario) {
    return this.http.post(`${this.url}/Registrar`, me);
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
