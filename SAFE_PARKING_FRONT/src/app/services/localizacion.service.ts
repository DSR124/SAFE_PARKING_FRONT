import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Localizacion } from '../models/localizacion';

const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class LocalizacionService {
  private url = `${base_url}/localizaciones`;
  private listaCambio = new Subject<Localizacion[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los Localizaciones
  list() {
    return this.http.get<Localizacion[]>(`${this.url}/Listar`);
  }
  // Obtener un Localizacion por ID
  getById(id: number) {
    return this.http.get<Localizacion>(`${this.url}/ListarporID/${id}`);
  }
  // Actualizar un Localizacion
  update(localizacion: Localizacion) {
    return this.http.put(`${this.url}/Modificar`, localizacion);
  }
  // Eliminar un Localizacion
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  // Crear un nuevo Localizacion
  insert(lc: Localizacion) {
    return this.http.post(`${this.url}/Registrar`, lc);
  }

  setList(listaNueva: Localizacion[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
