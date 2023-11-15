import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CantidadReservasPorUsuarioService } from 'src/app/services/cantidad-reservas-por-usuario.service';

@Component({
  selector: 'app-cant-reservas-por-usuario',
  templateUrl: './cant-reservas-por-usuario.component.html',
  styleUrls: ['./cant-reservas-por-usuario.component.css'],
})
export class CantReservasPorUsuarioComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(
    private cantidadReservasService: CantidadReservasPorUsuarioService
  ) {}

  ngOnInit(): void {
    this.cantidadReservasService
      .CantidadReservasPorUsuario()
      .subscribe((data) => {
        this.barChartLabels = data.map((item) => item.nameUser);
        const randomColors = this.generateRandomColors(data.length);

        this.barChartData = [
          {
            data: data.map((item) => item.quantityReservation),
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
