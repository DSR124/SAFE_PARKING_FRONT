import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CantidadReservasPorFecha } from 'src/app/models/cantidadReservasPorFecha';
import { CantidadReservasPorFechaService } from 'src/app/services/cantidad-reservas-por-fecha.service';

@Component({
  selector: 'app-cant-reservas-por-fecha',
  templateUrl: './cant-reservas-por-fecha.component.html',
  styleUrls: ['./cant-reservas-por-fecha.component.css'],
})
export class CantReservasPorFechaComponent implements OnInit {
  dataSource: MatTableDataSource<CantidadReservasPorFecha> =
    new MatTableDataSource();
  displayedColumns: string[] = ['date_reservation', 'reservation_quantity'];

  constructor(
    private cantidadReservasService: CantidadReservasPorFechaService
  ) {}

  ngOnInit(): void {
    this.cantidadReservasService
      .CantidadReservasPorFecha()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
