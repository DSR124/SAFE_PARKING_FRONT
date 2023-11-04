import { Injectable } from '@angular/core';
import { HorarioEstacionamiento } from '../models/horarioEstacionamiento';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_datos; // ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class HorarioEstacionamientoService {
  private url = `${base_url}/horarioEstacionamientos`;
  private listaCambio = new Subject<HorarioEstacionamiento[]>();
  constructor(private http: HttpClient) {}
  // Obtener todos los Horarios
  list() {
    return this.http.get<HorarioEstacionamiento[]>(`${this.url}/Listar`);
  }
  setList(listaNueva: HorarioEstacionamiento[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  // Obtener un Horario por ID
  listId(id: number) {
    return this.http.get<HorarioEstacionamiento>(
      `${this.url}/ListarporID/${id}`
    );
  }
  // Actualizar un Horario
  update(hE: HorarioEstacionamiento) {
    return this.http.put(`${this.url}/Modificar`, hE);
  }
  // Eliminar un Horario
  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }
  // Crear un nuevo Horario
  insert(lc: HorarioEstacionamiento) {
    return this.http.post(`${this.url}/Registrar`, lc);
  }
}
