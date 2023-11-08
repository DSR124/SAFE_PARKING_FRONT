import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-listar-admin-comentario',
  templateUrl: './listar-admin-comentario.component.html',
  styleUrls: ['./listar-admin-comentario.component.css'],
})
export class ListarAdminComentarioComponent implements OnInit {
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'contenido',
    'valoracion',
    'fechacreacion',
    'idUsuario',
    'modificar',
    'eliminar',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: ComentarioService, public route: ActivatedRoute) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
