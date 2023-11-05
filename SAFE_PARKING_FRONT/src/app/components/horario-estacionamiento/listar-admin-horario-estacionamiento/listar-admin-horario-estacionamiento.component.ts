import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HorarioEstacionamiento } from 'src/app/models/horarioEstacionamiento';
import { HorarioEstacionamientoService } from 'src/app/services/horario-estacionamiento.service';

@Component({
  selector: 'app-listar-admin-horario-estacionamiento',
  templateUrl: './listar-admin-horario-estacionamiento.component.html',
  styleUrls: ['./listar-admin-horario-estacionamiento.component.css'],
})
export class ListarAdminHorarioEstacionamientoComponent implements OnInit {
  dataSource: MatTableDataSource<HorarioEstacionamiento> =
    new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'horario',
    'Estacionamiento',
    'accion01',
    'accion02',
  ];
  editarHorarioEstacionamiento: HorarioEstacionamiento | null = null; // Variable para realizar un seguimiento de la fila en edición
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private heS: HorarioEstacionamientoService,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.heS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.heS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(idhorarioEstacionamiento: number) {
    this.heS.delete(idhorarioEstacionamiento).subscribe(() => {
      this.heS.list().subscribe((data) => {
        this.heS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
