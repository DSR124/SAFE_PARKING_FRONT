import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscar-usuarios.component.html',
  styleUrls: ['./buscar-usuarios.component.css'],
})
export class BuscarUsuariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usu: Usuario = new Usuario();
  idUsuario: number = 0;

  constructor(private uS: UsuarioService, public route: ActivatedRoute) {}
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
  imagenNoCargada(event: Event) {
    const imagen = event.target as HTMLImageElement;
    imagen.src = 'assets/image/EstacionamientoDefault.jpg'; // Ruta de otra imagen predeterminada o un mensaje de error
  }
  getImagenUrl(): string {
    // Verifica si la propiedad 'foto' está presente y no es nula
    if (this.usu.imagen) {
      // Construye y retorna la URL de la imagen
      return 'data:image/jpeg;base64,' + this.usu.imagen;
    } else {
      // Si no hay imagen, retorna la ruta de la imagen por defecto
      return 'assets/image/EstacionamientoDefault.jpg';
    }
  }

    //Para ocultar la barra

    mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

    toggleNavbar() {
      this.mostrarNavbar = !this.mostrarNavbar;
    }
    //Fin de ocultar la barra
}
