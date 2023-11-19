import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Estacionamiento } from 'src/app/models/estacionamiento';
import { EstacionamientoService } from 'src/app/services/estacionamiento.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-buscar-estacionamiento',
  templateUrl: './buscar-estacionamiento.component.html',
  styleUrls: ['./buscar-estacionamiento.component.css'],
})
export class BuscarEstacionamientoComponent {
  form: FormGroup = new FormGroup({});
  estacionamiento: Estacionamiento = new Estacionamiento();
  idEstacionamiento: number = 0;
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra
  role: string = '';

  constructor(
    private eS: EstacionamientoService,
    private loginService: LoginService,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.buscar();
  }
  buscar() {
    this.idNoEncontrado = false; // Reiniciamos la variable de validación

    this.eS.listId(this.idEstacionamiento).subscribe(
      (data: Estacionamiento) => {
        this.estacionamiento = data;
      },
      (error) => {
        console.error('Error al obtener el horario por ID:', error);
        this.idNoEncontrado = true; // Establecemos la variable a true si el ID no se encontró
      }
    );
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

  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
}
