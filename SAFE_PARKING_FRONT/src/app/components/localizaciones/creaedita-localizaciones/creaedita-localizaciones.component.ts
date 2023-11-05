import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import * as L from 'leaflet';
import { Localizacion } from 'src/app/models/localizacion';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
import 'leaflet-control-geocoder'; // Importar el plugin de geocodificación

declare var google: any;

@Component({
  selector: 'app-creaedita-localizaciones',
  templateUrl: './creaedita-localizaciones.component.html',
  styleUrls: ['./creaedita-localizaciones.component.css'],
})
export class CreaeditaLocalizacionesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  localizacion: Localizacion = new Localizacion();
  mensaje: String = '';
  map!: L.Map;
  marker: L.Marker | null = null;
  id: number = 0;
  edicion: boolean = false;

  lugarABuscar: string = '';
  resultados: Localizacion[] = [];

  constructor(
    private lS: LocalizacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      direccion: ['', Validators.required],
      distrito: ['', Validators.required],
      region: ['', Validators.required],
      referencia: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
    this.initializeMap();
  }

  registrar() {
    if (this.form.valid) {
      this.localizacion.idLocalizacion = this.form.value.idLocalizacion;
      this.localizacion.direccion = this.form.value.direccion;
      this.localizacion.distrito = this.form.value.distrito;
      this.localizacion.region = this.form.value.region;
      this.localizacion.referencia = this.form.value.referencia;
      this.localizacion.latitud = this.form.value.latitud;
      this.localizacion.longitud = this.form.value.longitud;

      if (this.edicion) {
        this.lS.update(this.localizacion).subscribe(() => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      } else {
        this.lS.insert(this.localizacion).subscribe((data) => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      }
      this.router.navigate(['modificar_localizaciones']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
  initializeMap() {
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

    this.map = L.map('map').setView([-12.04318, -77.02824], 13);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    /*Nuevo para boton de busqueda*/

    const searchControl = (L.Control as any).geocoder(); // Crear el control de búsqueda

    searchControl.addTo(this.map); // Agregar el control al mapa

    searchControl.on('markgeocode', (event: any) => {
      const { center } = event.geocode; // Obtener la ubicación del resultado de búsqueda
      this.map.setView(center, 13); // Reposicionar el mapa a la ubicación encontrada

      if (this.marker) {
        this.map.removeLayer(this.marker); // Quitar marcador existente
      }
      this.addMarker(center); // Agregar un nuevo marcador
    });

    this.map.on('click', (e) => {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.addMarker(e.latlng);
    });

    this.map.on('contextmenu', () => {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
    });
  }

  addMarker(latlng: L.LatLng) {
    // Agregar el nuevo marcador en la posición del clic
    this.marker = L.marker(latlng).addTo(this.map);

    // Obtener una referencia a los controles de latitud y longitud
    const latitudControl = this.form.get('latitud');
    const longitudControl = this.form.get('longitud');

    if (latitudControl && longitudControl) {
      // Actualizar los valores de los controles
      latitudControl.setValue(latlng.lat.toString());
      longitudControl.setValue(latlng.lng.toString());
    }
  }

  init() {
    if (this.edicion) {
      this.lS.getById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          direccion: new FormControl(data.direccion),
          distrito: new FormControl(data.distrito),
          region: new FormControl(data.region),
          referencia: new FormControl(data.referencia),
          latitud: new FormControl(data.latitud),
          longitud: new FormControl(data.longitud),
        });
      });
    }
  }
  obtenerConntrolCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
