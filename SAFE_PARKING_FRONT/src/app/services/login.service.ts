import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post('https://safe-parking-deployment-2023.onrender.com/authenticate', request);
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
  obtenerPerfil(): { nombreUsuario: string; rol: string } | null {
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
      nombreUsuario: decodedToken ? decodedToken.sub || '' : '',
      rol: decodedToken ? decodedToken.role || '' : '',
    };
  }
}
