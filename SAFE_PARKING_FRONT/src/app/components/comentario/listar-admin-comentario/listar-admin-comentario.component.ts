import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-listar-admin-comentario',
  templateUrl: './listar-admin-comentario.component.html',
  styleUrls: ['./listar-admin-comentario.component.css']
})
export class ListarAdminComentarioComponent implements OnInit {

  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource();
  displayedColumns: string[] =
    ['codigo', 'contenido', 'valoracion', 'fechacreacion', 'idUsuario'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: ComentarioService) {

  }
  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

  
}
