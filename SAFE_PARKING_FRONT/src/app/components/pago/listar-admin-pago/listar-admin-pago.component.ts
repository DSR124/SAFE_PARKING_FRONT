import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { Rol } from 'src/app/models/rol';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-listar-admin-pago',
  templateUrl: './listar-admin-pago.component.html',
  styleUrls: ['./listar-admin-pago.component.css'],
})
export class ListarAdminPagoComponent {
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idPago',
    'fechaEmision',
    'precioTotal',
    'tipoPago',
    'reservaEstacionamiento',
    'conductor',
    'accion01',
    'accion02',
  ];
  role: string = '';

  editarPago: Pago | null = null; // Variable para realizar un seguimiento de la fila en edición
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pS: PagoService,
    private loginService: LoginService,
    public route: ActivatedRoute
  ) {}
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
