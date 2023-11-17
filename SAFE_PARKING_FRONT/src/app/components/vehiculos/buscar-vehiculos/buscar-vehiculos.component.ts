import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-buscar-vehiculos',
  templateUrl: './buscar-vehiculos.component.html',
  styleUrls: ['./buscar-vehiculos.component.css'],
})
export class BuscarVehiculosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  vehiculo: Vehiculo = new Vehiculo();
  idVehiculo: number = 0;
  role: string = '';

  constructor(
    private vehiculoService: VehiculoService,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {}

  buscar() {
    this.vehiculoService.getById(this.idVehiculo).subscribe(
      (data: Vehiculo) => {
        this.vehiculo = data;
      },
      (error) => {
        console.error('Error al obtener el vehículo por ID:', error);
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
  imagenNoCargada(event: Event) {
    const imagen = event.target as HTMLImageElement;
    imagen.src = 'assets/image/EstacionamientoDefault.jpg'; // Ruta de otra imagen predeterminada o un mensaje de error
  }
  getImagenUrl(): string {
    // Verifica si la propiedad 'foto' está presente y no es nula
    if (this.vehiculo.imagenVehiculo) {
      // Construye y retorna la URL de la imagen
      return 'data:image/jpeg;base64,' + this.vehiculo.imagenVehiculo;
    } else {
      // Si no hay imagen, retorna la ruta de la imagen por defecto
      return 'assets/image/EstacionamientoDefault.jpg';
    }
  }
}
