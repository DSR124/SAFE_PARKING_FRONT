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
  barChartType: ChartType = 'doughnut';
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
        const randomColors = this.generateRandomColors(data.length);

        this.barChartData = [
          {
            data: data.map((item) => item.reservation_quantity),
            label: 'cantidad de reservas',
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
