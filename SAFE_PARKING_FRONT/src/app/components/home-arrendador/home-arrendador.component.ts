import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-arrendador',
  templateUrl: './home-arrendador.component.html',
  styleUrls: ['./home-arrendador.component.css'],
})
export class HomeArrendadorComponent {
  constructor(public route: ActivatedRoute) {}

    //Para ocultar la barra

  mostrarNavbar = true; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra

}
