import { Injectable } from '@angular/core';
import { Estacionamiento } from '../models/estacionamiento';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_datos;
@Injectable({
  providedIn: 'root'
})
export class EstacionamientoService {

  private url = `${base_url}/estacionamientos`;
  private listaCambio = new Subject<Estacionamiento[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Estacionamiento[]>(`${this.url}/Listar`);
  }
  listId(id: number) {
    return this.http.get<Estacionamiento>(`${this.url}/ListarporID/${id}`);
  }
  update(estacionamiento: Estacionamiento) {
    return this.http.put(`${this.url}/Modificar`, estacionamiento);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  insert(lc: Estacionamiento) {
    return this.http.post(`${this.url}/Registrar`, lc);
  }

  setList(listaNueva: Estacionamiento[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


}

