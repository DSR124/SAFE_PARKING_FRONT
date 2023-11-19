import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private loginService: LoginService,
    public dialog: MatDialog
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
  confirmarSalir(): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas salir?');
    if (confirmacion) {
      this.cerrar(); // Llama a la función cerrar() cuando se confirma la salida
    }
  }
  cerrar() {
    // Redirigir al componente de inicio de sesión
    this.router.navigate(['/login']);
  }
  
}
