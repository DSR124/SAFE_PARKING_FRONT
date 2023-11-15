// detalle-estacionamiento.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Estacionamiento } from 'src/app/models/estacionamiento';
import { EstacionamientoService } from 'src/app/services/estacionamiento.service';
import * as L from 'leaflet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-detalle-estacionamiento',
  templateUrl: './detalle-estacionamiento.component.html',
  styleUrls: ['./detalle-estacionamiento.component.css']
})
export class DetalleEstacionamientoComponent implements OnInit {
  formularioReserva: FormGroup;

  estacionamiento: Estacionamiento = new Estacionamiento();
  id: number = 0;
  edicion: boolean = false;
  map!: L.Map;
  marker: L.Marker | null = null;

  constructor(
    private fb: FormBuilder,
    private eS: EstacionamientoService,
    private reservaService: ReservaEstacionamientoService,
    private route: ActivatedRoute
  ) {
    this.formularioReserva = this.fb.group({
      fecha: [''],  // Agrega más campos según tus necesidades
      horaApertura: [''],
      horaCierre: [''],
      // Otros campos del formulario
    });
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
    this.inicializarMapa()
  }
  inicializarMapa() {
    // Obtén el ID del estacionamiento de la URL
    // Recupera los detalles del estacionamiento según el ID
    this.eS.listId(this.id).subscribe((data) => {
      this.estacionamiento = data;

      // Inicializa el mapa
      this.map = L.map('map').setView([this.estacionamiento.localizacion.latitud, this.estacionamiento.localizacion.longitud], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      // Asigna el marcador a la ubicación del estacionamiento
      this.marker = L.marker([this.estacionamiento.localizacion.latitud, this.estacionamiento.localizacion.longitud]);
      this.marker.addTo(this.map);
      this.marker.bindPopup(`
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
    });
  }

  regresar() {
    // Puedes navegar hacia atrás o a otra ruta según tus necesidades
    // this.router.navigate(['/ruta-anterior']);
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


}