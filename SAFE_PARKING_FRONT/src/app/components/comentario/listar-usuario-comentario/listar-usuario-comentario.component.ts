import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from 'src/app/services/comentario.service';
import { LoginService } from 'src/app/services/login.service';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';
import { Comentario } from 'src/app/models/comentario';
import { MatTableDataSource } from '@angular/material/table';
export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-listar-usuario-comentario',
  templateUrl: './listar-usuario-comentario.component.html',
  styleUrls: ['./listar-usuario-comentario.component.css'],
})
export class ListarUsuarioComentarioComponent implements OnInit {
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource();
  role: string = '';
  comentario: Comentario = new Comentario();

  displayedColumns: string[] = [
    'codigo',
    'contenido',
    'valoracion',
    'fechacreacion',
    'idUsuario',
    'modificar',
    'eliminar',
  ];
  constructor(
    private cS: ComentarioService,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
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
  imagenNoCargada(event: Event) {
    const imagen = event.target as HTMLImageElement;
    imagen.src = 'assets/image/EstacionamientoDefault.jpg'; // Ruta de otra imagen predeterminada o un mensaje de error
  }
  getImagenUrl(comentario: Comentario): string {
    if (comentario.reservaEstacionamiento.users.imagen) {
      return (
        'data:image/jpeg;base64,' +
        comentario.reservaEstacionamiento.users.imagen
      );
    } else {
      return 'assets/image/EstacionamientoDefault.jpg';
    }
  }
  generarEstrellas(valoracion: number): string {
    let estrellas = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= valoracion) {
        estrellas += '&#9733;'; // Estrella llena
      } else {
        estrellas += '&#9734;'; // Estrella vacía
      }
    }
    return estrellas;
  }
}
