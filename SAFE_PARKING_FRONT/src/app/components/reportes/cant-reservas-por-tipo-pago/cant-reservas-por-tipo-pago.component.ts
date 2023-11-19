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
