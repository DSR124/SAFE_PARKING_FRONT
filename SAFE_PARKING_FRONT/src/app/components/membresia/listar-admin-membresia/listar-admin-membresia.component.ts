import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Membresia } from 'src/app/models/membresia';
import { LoginService } from 'src/app/services/login.service';
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
  role: string = '';

  editarMembresia: Membresia | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private mS: MembresiaService,
    private loginService: LoginService,
    public route: ActivatedRoute
  ) {}
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
  
  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
}
