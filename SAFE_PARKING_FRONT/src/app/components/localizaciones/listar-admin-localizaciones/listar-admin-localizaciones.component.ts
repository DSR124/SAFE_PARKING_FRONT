import { MatTableDataSource } from '@angular/material/table';
import { Localizacion } from 'src/app/models/localizacion';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LocalizacionService } from '../../../services/localizacion.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-admin-localizaciones',
  templateUrl: './listar-admin-localizaciones.component.html',
  styleUrls: ['./listar-admin-localizaciones.component.css'],
})
export class ListarAdminLocalizacionesComponent {
  dataSource: MatTableDataSource<Localizacion> = new MatTableDataSource();
  role: string = '';

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

  constructor(
    private lS: LocalizacionService,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
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

   //Para ocultar la barra

   mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

   toggleNavbar() {
     this.mostrarNavbar = !this.mostrarNavbar;
   }
   //Fin de ocultar la barra
 
}
