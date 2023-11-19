import { Component, OnInit } from '@angular/core';
import { CantidadIncidentesPorRolService } from '../../../services/cantidad-incidentes-por-rol.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-cant-incidentes-por-rol',
  templateUrl: './cant-incidentes-por-rol.component.html',
  styleUrls: ['./cant-incidentes-por-rol.component.css'],
})
export class CantIncidentesPorRolComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(
    private cantidadReservasService: CantidadIncidentesPorRolService
  ) {}

  ngOnInit(): void {
    this.cantidadReservasService

      .CantidadIncidentesPorRol()
      .subscribe((data) => {
        this.barChartLabels = data.map((item) => item.nombreRol);

        this.barChartData = [
          {
            data: data.map((item) => item.cantIncidentes),
            label: 'Cantidad de Incidentes',
            backgroundColor: ['#11998e', '#38ef7d', '#000000']
          },
        ];
      });
  }

  
  //Para ocultar la barra
  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra
  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra

}
