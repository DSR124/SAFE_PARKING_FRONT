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
        const randomColors = this.generateRandomColors(data.length);

        this.barChartData = [
          {
            data: data.map((item) => item.cantIncidentes),
            label: 'Cantidad de Incidentes',
            backgroundColor: randomColors,
          },
        ];
      });
  }
  private generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.3)`;
      colors.push(color);
    }
    return colors;
  }
}
