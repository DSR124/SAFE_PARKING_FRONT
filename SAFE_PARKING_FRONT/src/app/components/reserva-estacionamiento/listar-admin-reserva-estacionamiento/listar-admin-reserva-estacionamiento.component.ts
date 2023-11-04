import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ReservaEstacionamiento } from 'src/app/models/reservaEstacionamiento';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';

@Component({
  selector: 'app-listar-admin-reserva-estacionamiento',
  templateUrl: './listar-admin-reserva-estacionamiento.component.html',
  styleUrls: ['./listar-admin-reserva-estacionamiento.component.css']
})
export class ListarAdminReservaEstacionamientoComponent implements OnInit {
  dataSource: MatTableDataSource<ReservaEstacionamiento> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idReservaEstacionamiento',
    'estado',
    'favorito',
    'fecha',
    'users',
    'vehiculo',
    'horarioEstacionamiento',
    'accion01',
    'accion02'
  ];

  editarUsuario: ReservaEstacionamiento | null = null; // Variable para realizar un seguimiento de la fila en edición
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reS: ReservaEstacionamientoService, public route: ActivatedRoute) {}
  ngOnInit(): void {
    this.reS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  modificar(reservaestacionamiento: ReservaEstacionamiento) {
    this.editarUsuario = reservaestacionamiento; // Establece la fila actual como editable
  }

  cancelarEdicion() {
    this.editarUsuario = null; // Cancela la edición
  }

  guardarEdicion(usuario: ReservaEstacionamiento) {
    // Lógica para guardar la edición (puedes llamar a tu servicio de modificación aquí)
    this.reS.update(usuario).subscribe(() => {
      this.editarUsuario = null; // Termina la edición
    });
  }
  eliminar(idReservaEstacionamiento: number) {
    this.reS.delete(idReservaEstacionamiento).subscribe(() => {
      this.reS.list().subscribe((data) => {
        this.reS.setList(data);
      });
    });
  }
}

