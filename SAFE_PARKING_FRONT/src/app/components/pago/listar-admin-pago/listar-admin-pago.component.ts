import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { Rol } from 'src/app/models/rol';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-listar-admin-pago',
  templateUrl: './listar-admin-pago.component.html',
  styleUrls: ['./listar-admin-pago.component.css']
})
export class ListarAdminPagoComponent {
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idPago',
    'fechaEmision',
    'precioTotal',
    'tipoPago',
    'reservaEstacionamiento', 'accion01','accion02'
  ];

  editarPago: Pago | null = null; // Variable para realizar un seguimiento de la fila en edición
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pS: PagoService, public route: ActivatedRoute) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(idPago: number) {
    this.pS.delete(idPago).subscribe(() => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}
