import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from 'src/app/services/horario.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-admin-horario',
  templateUrl: './listar-admin-horario.component.html',
  styleUrls: ['./listar-admin-horario.component.css'],
})
export class ListarAdminHorarioComponent implements OnInit {
  dataSource: MatTableDataSource<Horario> = new MatTableDataSource();
  role: string = '';

  displayedColumns: string[] = [
    'idHorario',
    'fecha',
    'horaApertura',
    'horaCierre',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  id: number = 0;
  form: FormGroup = new FormGroup({});
  mensaje: string;

  constructor(
    private hS: HorarioService,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.mensaje = '';
  }

  ngOnInit(): void {
    //Para que muestre la lista completa
    this.hS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    //Para que no haya necesidad de Refrescar la pagina
    this.hS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.form = this.formBuilder.group({
      id: [null, Validators.required],
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
  //Añadir

  eliminar(id: number) {
    this.hS.delete(id).subscribe((data) => {
      this.hS.list().subscribe((data) => {
        this.hS.setList(data);
      });
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
  
   //Para ocultar la barra

   mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

   toggleNavbar() {
     this.mostrarNavbar = !this.mostrarNavbar;
   }
   //Fin de ocultar la barra
}
