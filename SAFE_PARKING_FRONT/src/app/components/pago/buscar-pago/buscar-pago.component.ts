import { PagoService } from './../../../services/pago.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-buscar-pago',
  templateUrl: './buscar-pago.component.html',
  styleUrls: ['./buscar-pago.component.css'],
})
export class BuscarPagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pago: Pago = new Pago();
  id: number = 0; //Para  el buscar - será añadido en el HTML
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra
  role: string = '';

  constructor(
    private pS: PagoService,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.buscar();
  }
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

  buscar() {
    this.idNoEncontrado = false; // Reiniciamos la variable de validación

    this.pS.listId(this.id).subscribe(
      (data: Pago) => {
        this.pago = data;
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
