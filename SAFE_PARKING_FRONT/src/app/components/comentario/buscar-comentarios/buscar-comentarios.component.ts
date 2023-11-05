import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';

@Component({
  selector: 'app-buscar-comentarios',
  templateUrl: './buscar-comentarios.component.html',
  styleUrls: ['./buscar-comentarios.component.css']
})
export class BuscarComentariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  com: Comentario = new Comentario();
  idComentario: number = 0;

  constructor(
    private cS: ComentarioService,
    private reS: ReservaEstacionamientoService,
    public route: ActivatedRoute,
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
}
