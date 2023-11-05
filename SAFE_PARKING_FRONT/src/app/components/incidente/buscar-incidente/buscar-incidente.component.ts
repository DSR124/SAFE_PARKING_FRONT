import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Incidente } from 'src/app/models/incidente';
import { IncidenteService } from 'src/app/services/incidente.service';

@Component({
  selector: 'app-buscar-incidente',
  templateUrl: './buscar-incidente.component.html',
  styleUrls: ['./buscar-incidente.component.css'],
})
export class BuscarIncidenteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  incidente: Incidente = new Incidente();
  usuario: Usuario = new Usuario();
  idIncidente: number = 0;

  constructor(
    private incidenteService: IncidenteService,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.incidenteService.getById(this.idIncidente).subscribe(
      (data: Incidente) => {
        this.incidente = data;
      },
      (error) => {
        console.error('Error al obtener el incidente por ID:', error);
      }
    );
  }
}
