import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css'],
})
export class IncidenteComponent {
  constructor(public route: ActivatedRoute) {}
}
