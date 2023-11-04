import { ReservaEstacionamiento } from './../../../models/reservaEstacionamiento';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';


@Component({
  selector: 'app-creaedita-comentario',
  templateUrl: './creaedita-comentario.component.html',
  styleUrls: ['./creaedita-comentario.component.css']
})
export class CreaeditaComentarioComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  com:Comentario = new Comentario()
  mensaje: string = '';
  minFecha: Date = moment().add(-0, 'days').toDate();
  tiposingredientes: { value: string; viewValue: string }[] = [
    { value: 'Vegetal', viewValue: 'Vegetal' },
    { value: 'Proteina', viewValue: 'Proteina' },
  ];

  listaReservaEstacionamiento: ReservaEstacionamiento[] = []

  constructor(
    private reS: ReservaEstacionamientoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cS: ComentarioService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contenido: ['', Validators.required],
      valoracion: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      reservaEstacionamiento: ['', Validators.required]
    });

    this.reS.list().subscribe(data => {
      this.listaReservaEstacionamiento = data;
    })

  }

  aceptar(): void {
    if (this.form.valid) {
      this.com.contenido = this.form.value.contenido;
      this.com.valoracion = this.form.value.valoracion;
      this.com.fechaCreacion = this.form.value.fechaCreacion;
      this.com.reservaEstacionamiento.idReservaEstacionamiento=this.form.value.reservaEstacionamiento;
      

      this.cS.insert(this.com).subscribe(data => {
        this.cS.list().subscribe(data => {
          this.cS.setList(data)
        })
      })
      this.router.navigate(['comentarios'])
    } else {
      this.mensaje = 'Ingrese todos los campos!!'
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
