import { PagoService } from './../../../services/pago.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pago } from 'src/app/models/pago';



@Component({
  selector: 'app-buscar-pago',
  templateUrl: './buscar-pago.component.html',
  styleUrls: ['./buscar-pago.component.css']
})
export class BuscarPagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pago: Pago = new Pago();
  id: number = 0; //Para  el buscar - será añadido en el HTML
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra

  constructor(
    private pS: PagoService,
    public route: ActivatedRoute
    ) { }
  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.idNoEncontrado = false; // Reiniciamos la variable de validación

    this.pS.listId(this.id).subscribe(
      (data: Pago) => {
        this.pago = data;
      },
      (error) => {
        console.error('Error al obtener el pago por ID:', error);
        this.idNoEncontrado = true; // Establecemos la variable a true si el ID no se encontró
      }
    );
  }

}
