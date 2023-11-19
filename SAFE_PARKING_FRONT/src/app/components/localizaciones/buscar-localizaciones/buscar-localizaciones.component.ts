import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Localizacion } from 'src/app/models/localizacion';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { LoginService } from 'src/app/services/login.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
@Component({
  selector: 'app-buscar-localizaciones',
  templateUrl: './buscar-localizaciones.component.html',
  styleUrls: ['./buscar-localizaciones.component.css'],
})
export class BuscarLocalizacionesComponent implements OnInit {
  idLocalizacion: number = 0;
  map!: L.Map;
  marker: L.Marker | null = null;
  form: FormGroup = new FormGroup({});
  localizacion: Localizacion = new Localizacion();
  role: string = '';

  constructor(
    private busquedaService: LocalizacionService,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
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
    this.map = L.map('map').setView([-9.189967, -75.015152], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    );

    // Asignar el marcador a la ubicación encontrada
    if (this.localizacion) {
      this.marker = L.marker([
        this.localizacion.latitud,
        this.localizacion.longitud,
      ]);
      this.marker.addTo(this.map);
      this.marker.bindPopup(this.localizacion.direccion);
    }
  }

  buscar(): void {
    //iconos personalizados
    var iconDefault = L.icon({
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

    this.localizacion.idLocalizacion = this.idLocalizacion;
    if (this.idLocalizacion) {
      this.busquedaService
        .getById(this.idLocalizacion)
        .subscribe((localizacion) => {
          this.localizacion = localizacion;

          // Centrar el mapa en la ubicación encontrada
          this.map.setView([localizacion.latitud, localizacion.longitud], 13);

          // Asignar el marcador a la ubicación encontrada
          this.marker = L.marker([localizacion.latitud, localizacion.longitud]);
          this.marker.addTo(this.map);
          this.marker.bindPopup(
            `
            ID: ${localizacion.idLocalizacion}
            <br>
            Region: ${localizacion.region}
            <br>
            Distrito: ${localizacion.distrito}
            <br>
            Direccion: ${localizacion.direccion}
            <br>
            Referencia: ${localizacion.referencia}
          `
          );
        });
    }
  }
  obtenerConntrolCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`control no encontrado por el campo $(nombreCampo)`);
    }
    return control;
  }

  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
}
