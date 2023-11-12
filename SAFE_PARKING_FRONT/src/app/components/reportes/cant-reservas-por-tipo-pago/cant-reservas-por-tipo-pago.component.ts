import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CantidadReservasPorTipoPago } from 'src/app/models/cantidadReservasPorTipoPago';
import { CantidadReservasPorTipoPagoService } from '../../../services/cantidad-reservas-por-tipo-pago.service';

@Component({
  selector: 'app-cant-reservas-por-tipo-pago',
  templateUrl: './cant-reservas-por-tipo-pago.component.html',
  styleUrls: ['./cant-reservas-por-tipo-pago.component.css'],
})
export class CantReservasPorTipoPagoComponent implements OnInit {
  dataSource: MatTableDataSource<CantidadReservasPorTipoPago> =
    new MatTableDataSource();
  displayedColumns: string[] = ['tipoPgo', 'reservation_quantity'];

  constructor(
    private cantidadReservasService: CantidadReservasPorTipoPagoService
  ) {}

  ngOnInit(): void {
    this.cantidadReservasService
      .CantidadReservasPorTipoPago()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
