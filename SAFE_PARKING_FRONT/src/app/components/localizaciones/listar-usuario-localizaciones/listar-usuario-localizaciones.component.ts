import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { Localizacion } from 'src/app/models/localizacion';
import { Estacionamiento } from 'src/app/models/estacionamiento';
import { EstacionamientoService } from 'src/app/services/estacionamiento.service';
import { LoginService } from 'src/app/services/login.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-listar-usuario-localizaciones',
  templateUrl: './listar-usuario-localizaciones.component.html',
  styleUrls: ['./listar-usuario-localizaciones.component.css'],
})
export class ListarusuarioLocalizacionesComponent implements OnInit {
  map!: L.Map;
  markers: L.Marker[] = [];
  role: string = '';

  constructor(
    private estacionamientoService: EstacionamientoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.initializeMap();

    // Suscribirse a cambios en la lista de estacionamientos
    this.estacionamientoService.getList().subscribe((estacionamientos) => {
      this.actualizarMarcadores(estacionamientos);
    });

    // Llama a la función para cargar y mostrar todas las ubicaciones
    this.cargarTodosEstacionamientos();
  }

  initializeMap(): void {
    this.map = L.map('map').setView([-9.189967, -75.015152], 5);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const searchControl = (L.Control as any).geocoder(); // Crear el control de búsqueda
    searchControl.addTo(this.map); // Agregar el control al mapa
  }

  cargarTodosEstacionamientos(): void {
    this.estacionamientoService.list().subscribe(
      (estacionamientos: Estacionamiento[]) => {
        console.log('Estacionamientos:', estacionamientos);
        this.estacionamientoService.setList(estacionamientos); // Notificar cambios
      },
      (error) => {
        console.error('Error al obtener datos:', error);
        // Puedes mostrar un mensaje de error al usuario
      }
    );
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
  agregarMarcador(estacionamiento: Estacionamiento): void {
    //iconos personalizados
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    const marker = L.marker([
      estacionamiento.localizacion.latitud,
      estacionamiento.localizacion.longitud,
    ]);
    marker.addTo(this.map);

    // Construir el contenido del Popup con la imagen
    const popupContent = `
      <img src="${this.getImagenUrl(
        estacionamiento
      )}" alt="Imagen del estacionamiento" style="max-width: 100%; height: auto;">
      <br>
      ID Estacionamiento: ${estacionamiento.idEstacionamiento}
      <br>
      ID Localizacion: ${estacionamiento.localizacion.idLocalizacion}
      <br>
      Region: ${estacionamiento.localizacion.region}
      <br>
      Distrito: ${estacionamiento.localizacion.distrito}
      <br>
      Direccion: ${estacionamiento.localizacion.direccion}
      <br>
      Referencia: ${estacionamiento.localizacion.referencia}
    `;
    marker.bindPopup(popupContent);

    this.markers.push(marker);
  }

  getImagenUrl(estacionamiento: Estacionamiento): string {
    // Verifica si la propiedad 'foto' está presente y no es nula
    if (estacionamiento.foto) {
      // Construye y retorna la URL de la imagen
      return 'data:image/jpeg;base64,' + estacionamiento.foto;
    } else {
      // Si no hay imagen, retorna la ruta de la imagen por defecto
      return 'assets/image/EstacionamientoDefault.jpg';
    }
  }

  actualizarMarcadores(estacionamientos: Estacionamiento[]): void {
    // Limpiar marcadores existentes
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.markers = [];

    // Agregar marcadores con las nuevas localizaciones
    estacionamientos.forEach((estacionamiento) => {
      this.agregarMarcador(estacionamiento);
    });
  }
}
