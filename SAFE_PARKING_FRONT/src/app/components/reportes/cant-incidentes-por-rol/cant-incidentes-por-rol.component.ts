import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CantidadIncidentesPorRol } from 'src/app/models/cantidadIncidentesPorRol';
import { CantidadIncidentesPorRolService } from '../../../services/cantidad-incidentes-por-rol.service';

@Component({
  selector: 'app-cant-incidentes-por-rol',
  templateUrl: './cant-incidentes-por-rol.component.html',
  styleUrls: ['./cant-incidentes-por-rol.component.css'],
})
export class CantIncidentesPorRolComponent implements OnInit {
  dataSource: MatTableDataSource<CantidadIncidentesPorRol> =
    new MatTableDataSource();
  displayedColumns: string[] = ['nombreRol', 'cantIncidentes'];

  constructor(
    private cantidadReservasService: CantidadIncidentesPorRolService
  ) {}

  ngOnInit(): void {
    this.cantidadReservasService
      .CantidadIncidentesPorRol()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
