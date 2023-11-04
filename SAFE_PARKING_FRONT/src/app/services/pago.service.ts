import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pago } from '../models/pago';
const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private url = `${base_url}/ReservaEstacionamientos`;
  private listaCambio = new Subject<Pago[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Pago[]>(`${this.url}/Listar`);
  }
  listId(id: number) {
    return this.http.get<Pago>(`${this.url}/ListarporID/${id}`);
  }
  update(pago: Pago) {
    return this.http.put(`${this.url}/Modificar`, pago);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  insert(lc: Pago) {
    return this.http.post(`${this.url}/Registrar`, lc);
  }

  setList(listaNueva: Pago[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  //Falta un query

} 

