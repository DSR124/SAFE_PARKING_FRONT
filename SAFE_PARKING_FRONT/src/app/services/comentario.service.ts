import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comentario } from '../models/comentario';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root'
})

export class ComentarioService {

  private url = `${base_url}/comentarios`;
  private listaCambio = new Subject<Comentario[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los comentarios
  list() {
    return this.http.get<Comentario[]>(`${this.url}/Listar`);
  }
  // Obtener un comentario por ID
  getById(id: number) {
    return this.http.get<Comentario[]>(`${this.url}/ListarporID/${id}`);
  }
  // Actualizar un comentario
  update(comentario: Comentario) {
    return this.http.put(`${this.url}/Modificar`, comentario);
  }
  // Eliminar un comentario
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  // Crear un nuevo comentario
  insert(com: Comentario) {
    return this.http.post(`${this.url}/Registrar`, com);
  }

  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}