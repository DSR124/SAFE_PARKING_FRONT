import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-navbar-administrador',
  templateUrl: './navbar-administrador.component.html',
  styleUrls: ['./navbar-administrador.component.css'],
})
export class NavbarAdministradorComponent {
  role: string = '';
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol() {
    if (
      this.role == 'administrador' ||
      this.role == 'conductor' ||
      this.role == 'arrendador'
    ) {
      return true;
    } else {
      return false;
    }
  }
  cerrar() {
    sessionStorage.clear();
  }
}
