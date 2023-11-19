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

        this.barChartData = [
          {
            data: data.map((item) => item.quantityReservation),
            label: 'cantidad de reservas',
            backgroundColor: ['#11998e', '#38ef7d', '#000000'],          },
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
