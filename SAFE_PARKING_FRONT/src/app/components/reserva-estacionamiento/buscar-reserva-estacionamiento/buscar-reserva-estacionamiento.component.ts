import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservaEstacionamiento } from 'src/app/models/reservaEstacionamiento';
import { LoginService } from 'src/app/services/login.service';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';

@Component({
  selector: 'app-buscar-reserva-estacionamiento',
  templateUrl: './buscar-reserva-estacionamiento.component.html',
  styleUrls: ['./buscar-reserva-estacionamiento.component.css'],
})
export class BuscarReservaEstacionamientoComponent {
  form: FormGroup = new FormGroup({});
  reserva_estacionamiento: ReservaEstacionamiento =
    new ReservaEstacionamiento();
  idReserva_Estacionamiento: number = 0;
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra
  role: string = '';

  constructor(
    private r_eS: ReservaEstacionamientoService,
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

    this.r_eS.listId(this.idReserva_Estacionamiento).subscribe(
      (data: ReservaEstacionamiento) => {
        this.reserva_estacionamiento = data;
      },
      (error) => {
        console.error('Error al obtener el horario por ID:', error);
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
