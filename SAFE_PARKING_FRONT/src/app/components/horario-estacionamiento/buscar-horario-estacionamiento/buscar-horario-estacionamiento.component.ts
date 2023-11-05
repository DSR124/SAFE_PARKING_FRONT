import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HorarioEstacionamiento } from 'src/app/models/horarioEstacionamiento';
import { HorarioEstacionamientoService } from 'src/app/services/horario-estacionamiento.service';

@Component({
  selector: 'app-buscar-horario-estacionamiento',
  templateUrl: './buscar-horario-estacionamiento.component.html',
  styleUrls: ['./buscar-horario-estacionamiento.component.css'],
})
export class BuscarHorarioEstacionamientoComponent {
  form: FormGroup = new FormGroup({});
  hrs_estacionamiento: HorarioEstacionamiento = new HorarioEstacionamiento();
  id: number = 0; //Para  el buscar - será añadido en el HTML
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra

  constructor(
    private hrsEstacS: HorarioEstacionamientoService,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.buscar();
  }
  buscar() {
    this.idNoEncontrado = false; // Reiniciamos la variable de validación

    this.hrsEstacS.listId(this.id).subscribe(
      (data: HorarioEstacionamiento) => {
        this.hrs_estacionamiento = data;
      },
      (error) => {
        console.error('Error al obtener el pago por ID:', error);
        this.idNoEncontrado = true; // Establecemos la variable a true si el ID no se encontró
      }
    );
  }
}
