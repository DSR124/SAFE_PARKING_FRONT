// cant-precio-total-por-mes.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { PrecioTotalPorMesService } from 'src/app/services/precio-total-por-mes.service';

@Component({
  selector: 'app-cant-precio-total-por-mes',
  templateUrl: './cant-precio-total-por-mes.component.html',
  styleUrls: ['./cant-precio-total-por-mes.component.css'],
})
export class CantPrecioTotalPorMesComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private precioTotalPorMesService: PrecioTotalPorMesService) {}

  ngOnInit(): void {
    this.precioTotalPorMesService.getPrecioTotalPorMes().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.mes);
      const randomColors = this.generateRandomColors(data.length);

      this.barChartData = [
        {
          data: data.map((item) => item.precioTotal),
          label: 'cantidad de precio total',
          backgroundColor: randomColors.map((color) => `${color}0.3`), // Add alpha value for background
          borderColor: randomColors.map((color) => `${color}1`), // Add alpha value for border
          borderWidth: 1,
          fill: true,
        },
      ];
    });
  }
  private generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)},`;
      colors.push(color);
    }
    return colors;
  }
}
