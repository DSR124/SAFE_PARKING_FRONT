import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horario-estacionamiento',
  templateUrl: './horario-estacionamiento.component.html',
  styleUrls: ['./horario-estacionamiento.component.css'],
})
export class HorarioEstacionamientoComponent {
  constructor(public route: ActivatedRoute) {}
}
