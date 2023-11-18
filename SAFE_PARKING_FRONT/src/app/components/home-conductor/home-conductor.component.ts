import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.component.html',
  styleUrls: ['./home-conductor.component.css'],
})
export class HomeConductorComponent {
  constructor(public route: ActivatedRoute, private router: Router) {}
  ngOnInit() {}

    //Para ocultar la barra

    mostrarNavbar = true; // Variable de estado para controlar la visibilidad de la barra

    toggleNavbar() {
      this.mostrarNavbar = !this.mostrarNavbar;
    }
    //Fin de ocultar la barra
  
}
