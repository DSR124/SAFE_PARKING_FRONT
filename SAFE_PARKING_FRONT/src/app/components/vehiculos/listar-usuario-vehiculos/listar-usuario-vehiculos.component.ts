import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { LoginService } from 'src/app/services/login.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-listar-usuario-vehiculos',
  templateUrl: './listar-usuario-vehiculos.component.html',
  styleUrls: ['./listar-usuario-vehiculos.component.css'],
})
export class ListarUsuarioVehiculosComponent {
  dataSource: MatTableDataSource<Vehiculo> = new MatTableDataSource();
  role: string = '';
  coloresDeFondo: string[] = [];

  displayedColumns: string[] = [
    'codigo',
    'placa',
    'categoria',
    'color',
    'marca',
    'tamanio',
    'tarjeta de propiedad',
  ];

  constructor(
    private vS: VehiculoService,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.vS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(idlocalizacion: number) {
    this.vS.delete(idlocalizacion).subscribe(() => {
      this.vS.list().subscribe((data) => {
        this.vS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
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
  imagenNoCargada(event: any) {
    // Puedes agregar lógica adicional aquí si es necesario
    console.error('Error al cargar la imagen:', event);
  }

  getImagenUrl(vehicluo: Vehiculo): string {
    // Verifica si la propiedad 'foto' está presente y no es nula
    if (vehicluo.imagenVehiculo) {
      // Construye y retorna la URL de la imagen
      return 'data:image/jpeg;base64,' + vehicluo.imagenVehiculo;
    } else {
      // Si no hay imagen, retorna la ruta de la imagen por defecto
      return 'assets/image/EstacionamientoDefault.jpg';
    }
  }
  getColor(vehiculo: Vehiculo): string {
    return vehiculo.colorVehiculo || 'white'; // Puedes establecer un color predeterminado si colorVehiculo es null o undefined
  }
}
