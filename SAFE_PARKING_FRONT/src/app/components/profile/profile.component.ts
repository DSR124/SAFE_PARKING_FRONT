import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  rol: Rol = new Rol();
  usuario: Usuario = new Usuario();
  role: string = '';

  constructor(
    private perfilService: LoginService,
    private usuarioService: UsuarioService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    const perfil = this.perfilService.obtenerPerfil();

    if (perfil) {
      // Asigna los valores al modelo Rol
      this.rol.nombreRol = perfil.rol;
      this.rol.usuario.username = perfil.nombreUsuario;

      // Puedes asignar más propiedades según sea necesario

      // Obtener el perfil completo utilizando el nombre de usuario
      this.usuarioService.getByUsername(perfil.nombreUsuario).subscribe(
        (data) => {
          this.usuario = data;
        },
        (error) => {
          console.error('Error al obtener el perfil completo:', error);
          // Puedes manejar el error de alguna manera, por ejemplo, redireccionar a una página de error.
        }
      );
    } else {
      console.error('Error obteniendo perfil: Token no disponible');
      // Puedes manejar la redirección a la página de inicio de sesión o manejar de otra manera.
    }
  }
  verificar() {
    this.role = this.perfilService.showRole();
    return this.perfilService.verificar();
  }
  imagenNoCargada(event: Event) {
    const imagen = event.target as HTMLImageElement;
    imagen.src = 'assets/image/EstacionamientoDefault.jpg'; // Ruta de otra imagen predeterminada o un mensaje de error
  }
  getImagenUrl(): string {
    // Verifica si la propiedad 'foto' está presente y no es nula
    if (this.usuario.imagen) {
      // Construye y retorna la URL de la imagen
      return 'data:image/jpeg;base64,' + this.usuario.imagen;
    } else {
      // Si no hay imagen, retorna la ruta de la imagen por defecto
      return 'assets/image/EstacionamientoDefault.jpg';
    }
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
