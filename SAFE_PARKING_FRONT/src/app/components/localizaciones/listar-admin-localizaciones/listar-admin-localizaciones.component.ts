import { MatTableDataSource } from '@angular/material/table';
import { Localizacion } from 'src/app/models/localizacion';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LocalizacionService } from '../../../services/localizacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-admin-localizaciones',
  templateUrl: './listar-admin-localizaciones.component.html',
  styleUrls: ['./listar-admin-localizaciones.component.css'],
})
export class ListarAdminLocalizacionesComponent {
  dataSource: MatTableDataSource<Localizacion> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idLocalizacion',
    'direccion',
    'distrito',
    'region',
    'referencia',
    'latitud',
    'longitud',
    'accion01',
    'accion02',
  ];

  editarLocalizacion: Localizacion | null = null; // Variable para realizar un seguimiento de la fila en edición
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private lS: LocalizacionService, public route: ActivatedRoute) {}
  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(idlocalizacion: number) {
    this.lS.delete(idlocalizacion).subscribe(() => {
      this.lS.list().subscribe((data) => {
        this.lS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
