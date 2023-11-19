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

      this.barChartData = [
        {
          data: data.map((item) => item.precioTotal),
          label: 'cantidad de precio total',
          backgroundColor: ['#11998e', '#38ef7d', '#000000'],
          fill: true,
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
