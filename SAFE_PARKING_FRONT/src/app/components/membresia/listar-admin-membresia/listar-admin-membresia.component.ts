import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Membresia } from 'src/app/models/membresia';
import { MembresiaService } from 'src/app/services/membresia.service';

@Component({
  selector: 'app-listar-admin-membresia',
  templateUrl: './listar-admin-membresia.component.html',
  styleUrls: ['./listar-admin-membresia.component.css'],
})
export class ListarAdminMembresiaComponent {
  dataSource: MatTableDataSource<Membresia> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idMembresia',
    'tipoMembresia',
    'fechaInicio',
    'fechaFin',
    'precio',
    'accion01',
    'accion02',
  ];
  editarMembresia: Membresia | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private mS: MembresiaService, public route: ActivatedRoute) {}
  ngOnInit(): void {
    //Para que muestre la lista completa
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    //Para que no haya necesidad de Refrescar la pagina
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(idMembresia: number) {
    this.mS.delete(idMembresia).subscribe(() => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
