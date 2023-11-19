import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Incidente } from 'src/app/models/incidente';
import { IncidenteService } from 'src/app/services/incidente.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-admin-incidente',
  templateUrl: './listar-admin-incidente.component.html',
  styleUrls: ['./listar-admin-incidente.component.css'],
})
export class ListarAdminIncidenteComponent {
  dataSource: MatTableDataSource<Incidente> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idIncidente',
    'tipoIncidente',
    'descripcion',
    'usuario',
    'accion01',
    'accion02',
  ];
  role: string = '';

  editarIncidente: Incidente | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private iS: IncidenteService,
    private loginService: LoginService,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //Para que muestre la lista completa
    this.iS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    //Para que no haya necesidad de Refrescar la pagina
    this.iS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(idlocalizacion: number) {
    this.iS.delete(idlocalizacion).subscribe(() => {
      this.iS.list().subscribe((data) => {
        this.iS.setList(data);
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
