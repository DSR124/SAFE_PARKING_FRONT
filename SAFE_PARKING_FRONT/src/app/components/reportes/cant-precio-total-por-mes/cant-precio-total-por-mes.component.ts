// cant-precio-total-por-mes.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PrecioTotalporMes } from 'src/app/models/cantidadPrecioTotalporMeS';
import { PrecioTotalPorMesService } from 'src/app/services/precio-total-por-mes.service';

@Component({
  selector: 'app-cant-precio-total-por-mes',
  templateUrl: './cant-precio-total-por-mes.component.html',
  styleUrls: ['./cant-precio-total-por-mes.component.css'],
})
export class CantPrecioTotalPorMesComponent implements OnInit {
  dataSource: MatTableDataSource<PrecioTotalporMes> = new MatTableDataSource();
  displayedColumns: string[] = ['precioTotal', 'mes'];
  constructor(private precioTotalPorMesService: PrecioTotalPorMesService) {}

  ngOnInit(): void {
    this.precioTotalPorMesService.getPrecioTotalPorMes().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
