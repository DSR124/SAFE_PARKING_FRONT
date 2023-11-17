import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar-arrendador',
  templateUrl: './navbar-arrendador.component.html',
  styleUrls: ['./navbar-arrendador.component.css'],
})
export class NavbarArrendadorComponent {
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {}
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
