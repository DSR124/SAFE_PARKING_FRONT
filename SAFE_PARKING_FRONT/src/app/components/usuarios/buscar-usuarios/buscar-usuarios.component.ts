import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscar-usuarios.component.html',
  styleUrls: ['./buscar-usuarios.component.css']
})
export class BuscarUsuariosComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  usu:Usuario  = new Usuario();
  idUsuario: number = 0;

  constructor(
    private uS: UsuarioService,
    public route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.uS.getById(this.idUsuario).subscribe(
      (data: Usuario) => {
        this.usu = data;
      },
      (error) => {
        console.error('Error al obtener el vehículo por ID:', error);
      }
    );
  }

}
