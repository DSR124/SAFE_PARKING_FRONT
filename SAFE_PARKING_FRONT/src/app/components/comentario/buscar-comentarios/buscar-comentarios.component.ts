import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { LoginService } from 'src/app/services/login.service';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';

@Component({
  selector: 'app-buscar-comentarios',
  templateUrl: './buscar-comentarios.component.html',
  styleUrls: ['./buscar-comentarios.component.css'],
})
export class BuscarComentariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  com: Comentario = new Comentario();
  idComentario: number = 0;
  role: string = '';

  constructor(
    private cS: ComentarioService,
    private reS: ReservaEstacionamientoService,
    private loginService: LoginService,

    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.cS.listId(this.idComentario).subscribe(
      (data: Comentario) => {
        this.com = data;
      },
      (error) => {
        console.error('Error al obtener el vehículo por ID:', error);
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
}
