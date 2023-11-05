import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reserva-estacionamiento',
  templateUrl: './reserva-estacionamiento.component.html',
  styleUrls: ['./reserva-estacionamiento.component.css']
})
export class ReservaEstacionamientoComponent {
constructor(public route:ActivatedRoute){}
}
