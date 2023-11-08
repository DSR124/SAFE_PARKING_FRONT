import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comentario } from '../models/comentario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private url = `${base_url}/comentarios`;
  private listaCambio = new Subject<Comentario[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los comentarios
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Comentario[]>(`${this.url}/Listar`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Obtener un comentario por ID
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Comentario>(`${this.url}/ListarporID/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Actualizar un comentario
  update(comentario: Comentario) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/Modificar`, comentario, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Eliminar un comentario
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/Eliminar/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  // Crear un nuevo comentario
  insert(com: Comentario) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/Registrar`, com, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
