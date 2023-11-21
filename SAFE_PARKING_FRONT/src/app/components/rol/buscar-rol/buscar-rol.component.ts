import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-buscar-rol',
  templateUrl: './buscar-rol.component.html',
  styleUrls: ['./buscar-rol.component.css']
})
export class BuscarRolComponent {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  id: number = 0; //Para  el buscar - será añadido en el HTML
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra

  constructor(
    private rS: RolService,
    public route: ActivatedRoute
    ) { } 
  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.idNoEncontrado = false; // Reiniciamos la variable de validación

    this.rS.listId(this.id).subscribe(
      (data: Rol) => {
        this.rol = data;
      },
      (error) => {
        console.error('Error al obtener el pago por ID:', error);
        this.idNoEncontrado = true; // Establecemos la variable a true si el ID no se encontró
      }
    );
  }
  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
}
