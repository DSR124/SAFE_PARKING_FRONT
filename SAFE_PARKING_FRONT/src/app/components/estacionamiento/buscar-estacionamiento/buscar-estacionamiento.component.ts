import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Estacionamiento } from 'src/app/models/estacionamiento';
import { EstacionamientoService } from 'src/app/services/estacionamiento.service';
@Component({
  selector: 'app-buscar-estacionamiento',
  templateUrl: './buscar-estacionamiento.component.html',
  styleUrls: ['./buscar-estacionamiento.component.css']
})
export class BuscarEstacionamientoComponent {
  form: FormGroup = new FormGroup({});
  estacionamiento: Estacionamiento = new Estacionamiento();
  idEstacionamiento: number = 0;
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra

  constructor(private eS: EstacionamientoService, public route: ActivatedRoute) {}
  ngOnInit(): void {
    this.buscar();
  }
  buscar() {
    this.idNoEncontrado = false; // Reiniciamos la variable de validación

    this.eS.listId(this.idEstacionamiento).subscribe(
      (data: Estacionamiento) => {
        this.estacionamiento = data;
      },
      (error) => {
        console.error('Error al obtener el horario por ID:', error);
        this.idNoEncontrado = true; // Establecemos la variable a true si el ID no se encontró
      }
    );
  }
}
