import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-listar-admin-rol',
  templateUrl: './listar-admin-rol.component.html',
  styleUrls: ['./listar-admin-rol.component.css']
})
export class ListarAdminRolComponent implements OnInit{
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idRol',
    'nombreRol',
    'usuario',
    'accion01',
    'accion02',
  ];

  editarLocalizacion: Rol | null = null; // Variable para realizar un seguimiento de la fila en edición
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rS: RolService, public route: ActivatedRoute) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(idlocalizacion: number) {
    this.rS.delete(idlocalizacion).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
