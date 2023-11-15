import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CantidadReservasPorTipoPagoService } from 'src/app/services/cantidad-reservas-por-tipo-pago.service';

@Component({
  selector: 'app-cant-reservas-por-tipo-pago',
  templateUrl: './cant-reservas-por-tipo-pago.component.html',
  styleUrls: ['./cant-reservas-por-tipo-pago.component.css'],
})
export class CantReservasPorTipoPagoComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(
    private cantidadReservasService: CantidadReservasPorTipoPagoService
  ) {}

  ngOnInit(): void {
    this.cantidadReservasService
      .CantidadReservasPorTipoPago()
      .subscribe((data) => {
        this.barChartLabels = data.map((item) => item.tipoPgo);
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
