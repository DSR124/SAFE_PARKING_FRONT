import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CantidadReservasPorFechaService } from 'src/app/services/cantidad-reservas-por-fecha.service';

@Component({
  selector: 'app-cant-reservas-por-fecha',
  templateUrl: './cant-reservas-por-fecha.component.html',
  styleUrls: ['./cant-reservas-por-fecha.component.css'],
})
export class CantReservasPorFechaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Date[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(
    private cantidadReservasService: CantidadReservasPorFechaService
  ) {}

  ngOnInit(): void {
    this.cantidadReservasService
      .CantidadReservasPorFecha()
      .subscribe((data) => {
        this.barChartLabels = data.map((item) => item.date_reservation);

        this.barChartData = [
          {
            data: data.map((item) => item.reservation_quantity),
            label: 'cantidad de reservas',
            backgroundColor: ['#11998e', '#38ef7d', '#000000'],
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
