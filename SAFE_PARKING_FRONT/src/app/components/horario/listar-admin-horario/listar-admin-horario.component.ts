import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from 'src/app/services/horario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-admin-horario',
  templateUrl: './listar-admin-horario.component.html',
  styleUrls: ['./listar-admin-horario.component.css'],
})
export class ListarAdminHorarioComponent implements OnInit {
  dataSource: MatTableDataSource<Horario> = new MatTableDataSource();

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
    public route: ActivatedRoute
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
}
