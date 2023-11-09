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

  provinciasLima: { value: string; viewValue: string }[] = [
    { value: 'Lima', viewValue: 'Lima' },
    { value: 'Barranca', viewValue: 'Barranca' },
    { value: 'Cajatambo', viewValue: 'Cajatambo' },
    { value: 'Canta', viewValue: 'Canta' },
    { value: 'Cañete', viewValue: 'Cañete' },
    { value: 'Huaral', viewValue: 'Huaral' },
    { value: 'Huarochirí', viewValue: 'Huarochirí' },
    { value: 'Huaura', viewValue: 'Huaura' },
    { value: 'Oyón', viewValue: 'Oyón' },
    { value: 'Yauyos', viewValue: 'Yauyos' },
    { value: 'Otros', viewValue: 'Otros' },
    // Agrega más provincias según sea necesario
  ];

  distritosLima: { value: string; viewValue: string }[] = [
    { value: 'Ancón', viewValue: 'Ancón' },
    { value: 'Ate', viewValue: 'Ate' },
    { value: 'Barranco', viewValue: 'Barranco' },
    { value: 'Breña', viewValue: 'Breña' },
    { value: 'Carabayllo', viewValue: 'Carabayllo' },
    { value: 'Cercado de Lima', viewValue: 'Cercado de Lima' },
    { value: 'Chaclacayo', viewValue: 'Chaclacayo' },
    { value: 'Chorrillos', viewValue: 'Chorrillos' },
    { value: 'Cieneguilla', viewValue: 'Cieneguilla' },
    { value: 'Comas', viewValue: 'Comas' },
    { value: 'El Agustino', viewValue: 'El Agustino' },
    { value: 'Independencia', viewValue: 'Independencia' },
    { value: 'Jesus María', viewValue: 'Jesus María' },
    { value: 'La Molina', viewValue: 'La Molina' },
    { value: 'La Victoria', viewValue: 'La Victoria' },
    { value: 'Lince', viewValue: 'Lince' },
    { value: 'Los Olivos', viewValue: 'Los Olivos' },
    { value: 'Lurigancho-Chosica', viewValue: 'Lurigancho-Chosica' },
    { value: 'Lurín', viewValue: 'Lurín' },
    { value: 'Magdalena del Mar', viewValue: 'Magdalena del Mar' },
    { value: 'Miraflores', viewValue: 'Miraflores' },
    { value: 'Pachacámac', viewValue: 'Pachacámac' },
    { value: 'Pucusana', viewValue: 'Pucusana' },
    { value: 'Pueblo Libre', viewValue: 'Pueblo Libre' },
    { value: 'Puente Piedra', viewValue: 'Puente Piedra' },
    { value: 'Punta Hermosa', viewValue: 'Punta Hermosa' },
    { value: 'Punta Negra', viewValue: 'Punta Negra' },
    { value: 'Rímac', viewValue: 'Rímac' },
    { value: 'San Bartolo', viewValue: 'San Bartolo' },
    { value: 'San Borja', viewValue: 'San Borja' },
    { value: 'San Isidro', viewValue: 'San Isidro' },
    { value: 'San Juan de Lurigancho', viewValue: 'San Juan de Lurigancho' },
    { value: 'San Juan de Miraflores', viewValue: 'San Juan de Miraflores' },
    { value: 'San Luis', viewValue: 'San Luis' },
    { value: 'San Martín de Porres', viewValue: 'San Martín de Porres' },
    { value: 'San Miguel', viewValue: 'San Miguel' },
    { value: 'Santa Anita', viewValue: 'Santa Anita' },
    { value: 'Santa María del Mar', viewValue: 'Santa María del Mar' },
    { value: 'Santa Rosa', viewValue: 'Santa Rosa' },
    { value: 'Santiago de Surco', viewValue: 'Santiago de Surco' },
    { value: 'Surquillo', viewValue: 'Surquillo' },
    { value: 'Villa El Salvador', viewValue: 'Villa El Salvador' },
    { value: 'Villa María del Triunfo', viewValue: 'Villa María del Triunfo' },
    { value: 'Otros', viewValue: 'Otros' },
  ];

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
      this.router.navigate([
        'components/localizaciones/listar_admin_localizaciones',
      ]);
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
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
