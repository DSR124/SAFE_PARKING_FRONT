import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-buscar-horario',
  templateUrl: './buscar-horario.component.html',
  styleUrls: ['./buscar-horario.component.css'],
})
export class BuscarHorarioComponent {
  form: FormGroup = new FormGroup({});
  horario: Horario = new Horario();
  idHorario: number = 0;
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra

  constructor(private hS: HorarioService, public route: ActivatedRoute) {}
  ngOnInit(): void {
    this.buscar();
  }
  buscar() {
    this.idNoEncontrado = false; // Reiniciamos la variable de validación

    this.hS.getById(this.idHorario).subscribe(
      (data: Horario) => {
        this.horario = data;
      },
      (error) => {
        console.error('Error al obtener el horario por ID:', error);
        this.idNoEncontrado = true; // Establecemos la variable a true si el ID no se encontró
      }
    );
  }
}
