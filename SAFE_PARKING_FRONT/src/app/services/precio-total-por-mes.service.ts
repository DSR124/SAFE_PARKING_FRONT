import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PrecioTotalporMes } from '../models/cantidadPrecioTotalporMeS';

const base_url = environment.base_datos; // Ruta de la base de datos

@Injectable({
  providedIn: 'root',
})
export class PrecioTotalPorMesService {
  private url = `${base_url}/pagos`;

  private listaCambio = new Subject<PrecioTotalporMes[]>();

  constructor(private http: HttpClient) {}

  getPrecioTotalPorMes(): Observable<PrecioTotalporMes[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<PrecioTotalporMes[]>(`${this.url}/precioTotalporMes`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: PrecioTotalporMes[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<PrecioTotalporMes[]> {
    return this.listaCambio.asObservable();
  }
}
