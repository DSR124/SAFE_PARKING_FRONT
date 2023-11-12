

import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Estacionamiento } from 'src/app/models/estacionamiento';
import { EstacionamientoService } from 'src/app/services/estacionamiento.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-usuario-estacionamiento',
  templateUrl: './listar-usuario-estacionamiento.component.html',
  styleUrls: ['./listar-usuario-estacionamiento.component.css']
})
export class ListarUsuarioEstacionamientoComponent implements OnInit {
  dataSource: MatTableDataSource<Estacionamiento> = new MatTableDataSource();
  role: string = '';

  displayedColumns: string[] = [
    'idEstacionamiento',
    'tipoEstacionamiento',
    'disponibilidad',
    'foto',
    'promedioValoracion',
    'capacidad',
    'fechaRegistro',
    'precio',
    'usuario',
    'localizacion',
    'accion01',
    'accion02',
  ];

  editarEstacionamiento: Estacionamiento | null = null; // Variable para realizar un seguimiento de la fila en edición
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private eS: EstacionamientoService,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  modificar(estacionamiento: Estacionamiento) {
    this.editarEstacionamiento = estacionamiento; // Establece la fila actual como editable
  }

  cancelarEdicion() {
    this.editarEstacionamiento = null; // Cancela la edición
  }

  guardarEdicion(estacionamiento: Estacionamiento) {
    // Lógica para guardar la edición (puedes llamar a tu servicio de modificación aquí)
    this.eS.update(estacionamiento).subscribe(() => {
      this.editarEstacionamiento = null; // Termina la edición
    });
  }

  eliminar(idEstacionamiento: number) {
    this.eS.delete(idEstacionamiento).subscribe(() => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  validarRol() {
    if (
      this.role == 'administrador' ||
      this.role == 'conductor' ||
      this.role == 'arrendador'
    ) {
      return true;
    } else {
      return false;
    }
  }
/*
  // Agrega este método para manejar el botón de favoritos
  toggleFavorito(estacionamiento: Estacionamiento) {
    estacionamiento.favorito = !estacionamiento.favorito;
    // Llama a tu servicio para actualizar el estado de favorito en la base de datos
  }
  */
}
