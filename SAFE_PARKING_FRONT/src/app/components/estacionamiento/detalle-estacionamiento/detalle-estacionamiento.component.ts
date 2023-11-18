// detalle-estacionamiento.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Estacionamiento } from 'src/app/models/estacionamiento';
import { EstacionamientoService } from 'src/app/services/estacionamiento.service';
import * as L from 'leaflet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-detalle-estacionamiento',
  templateUrl: './detalle-estacionamiento.component.html',
  styleUrls: ['./detalle-estacionamiento.component.css'],
})
export class DetalleEstacionamientoComponent implements OnInit {
  formularioReserva: FormGroup;
  routingControl: any; // Variable para almacenar el control de enrutamiento
  estacionamiento: Estacionamiento = new Estacionamiento();
  id: number = 0;
  edicion: boolean = false;
  map!: L.Map;
  marker: L.Marker | null = null;
  role: string = '';
  markerFinal: any; // Asegúrate de que markerFinal esté inicializado

  constructor(
    private fb: FormBuilder,
    private eS: EstacionamientoService,
    private reservaService: ReservaEstacionamientoService,
    private loginService: LoginService,

    private route: ActivatedRoute
  ) {
    this.formularioReserva = this.fb.group({
      fecha: [''], // Agrega más campos según tus necesidades
      horaApertura: [''],
      horaCierre: [''],
      // Otros campos del formulario
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
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; // Utiliza el operador '+' para convertir el parámetro 'id' a número
      this.edicion = params['id'] != null;

      // Recupera los detalles del estacionamiento según el ID
      this.eS.listId(this.id).subscribe((data) => {
        this.estacionamiento = data;
      });
    });
    this.inicializarMapa();
  }

  inicializarMapa() {
    const latitudInicialAleatoria = -12.104;
    const longitudInicialAleatoria = -76.9633;

    this.eS.listId(this.id).subscribe((data) => {
      this.estacionamiento = data;

      this.map = L.map('map').setView(
        [
          this.estacionamiento.localizacion.latitud,
          this.estacionamiento.localizacion.longitud,
        ],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        this.map
      );

      const markerFinal = L.marker([
        this.estacionamiento.localizacion.latitud,
        this.estacionamiento.localizacion.longitud,
      ]);
      markerFinal.addTo(this.map);

      markerFinal.bindPopup(`
      ID del Estacionamiento: ${this.estacionamiento.idEstacionamiento}
      <br>
      Region: ${this.estacionamiento.localizacion.region}
      <br>
      Distrito: ${this.estacionamiento.localizacion.distrito}
      <br>
      Direccion: ${this.estacionamiento.localizacion.direccion}
      <br>
      Referencia: ${this.estacionamiento.localizacion.referencia}
    `);
      markerFinal.openPopup();

      this.routingControl = L.Routing.control({
        waypoints: [
          L.latLng(latitudInicialAleatoria, longitudInicialAleatoria),
          L.latLng(
            this.estacionamiento.localizacion.latitud,
            this.estacionamiento.localizacion.longitud
          ),
        ],
        routeWhileDragging: false,
      });

      // Agregar el control al mapa
      this.routingControl.addTo(this.map);
    });
  }

  getImagenUrl(estacionamiento: Estacionamiento | null): string {
    // Verifica si estacionamiento no es nulo antes de intentar acceder a sus propiedades
    if (estacionamiento) {
      // Verifica si la propiedad 'foto' está presente y no es nula
      if (estacionamiento.foto) {
        // Construye y retorna la URL de la imagen
        return 'data:image/jpeg;base64,' + estacionamiento.foto;
      }
    }
    // Si estacionamiento es nulo o no tiene 'foto', retorna la ruta de la imagen por defecto
    return 'assets/image/EstacionamientoDefault.jpg';
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

  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
}
