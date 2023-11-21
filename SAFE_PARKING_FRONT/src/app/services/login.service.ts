import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { environment } from 'src/environments/environment';
const base_url = environment.base_datos;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post(
      'https://safe-parking-deployment.onrender.com/authenticate',
      request
    );
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
  obtenerPerfil(): {
    idUsuario: number;
    nombreUsuario: string;
    rol: string;
  } | null {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en el sessionStorage');
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    if (!decodedToken) {
      console.error('Error al decodificar el token');
      return null;
    }
    console.log('Token decodificado:', decodedToken);
    return {
      idUsuario: decodedToken ? decodedToken.idUsuario || 0 : 0,
      nombreUsuario: decodedToken ? decodedToken.sub || '' : '',
      rol: decodedToken ? decodedToken.role || '' : '',
    };
  }

  getUserId(): number | null {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.userId || null;
  }
}
