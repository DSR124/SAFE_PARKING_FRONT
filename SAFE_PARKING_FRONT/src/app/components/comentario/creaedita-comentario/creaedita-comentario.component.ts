import { ReservaEstacionamiento } from './../../../models/reservaEstacionamiento';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';

@Component({
  selector: 'app-creaedita-comentario',
  templateUrl: './creaedita-comentario.component.html',
  styleUrls: ['./creaedita-comentario.component.css'],
})
export class CreaeditaComentarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  com: Comentario = new Comentario();
  mensaje: string = '';
  minFecha: Date = moment().add(-0, 'days').toDate();
  fechaCreacion = new FormControl(new Date());
  id: number = 0;
  edicion: boolean = false;
  tiposingredientes: { value: string; viewValue: string }[] = [
    { value: 'Vegetal', viewValue: 'Vegetal' },
    { value: 'Proteina', viewValue: 'Proteina' },
  ];

  listaReservaEstacionamiento: ReservaEstacionamiento[] = [];

  constructor(
    private reS: ReservaEstacionamientoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cS: ComentarioService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idComentario: [''],
      contenido: ['', Validators.required],
      valoracion: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      reservaEstacionamiento: ['', Validators.required],
    });
    this.reS.list().subscribe((data) => {
      this.listaReservaEstacionamiento = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.com.idComentario = this.form.value.idComentario;
      this.com.contenido = this.form.value.contenido;
      this.com.valoracion = this.form.value.valoracion;
      this.com.fechaCreacion = this.form.value.fechaCreacion;
      this.com.reservaEstacionamiento.idReservaEstacionamiento =
        this.form.value.reservaEstacionamiento;

      if (this.edicion) {
        this.cS.update(this.com).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.com).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }

      this.router.navigate(['comentarios/listar_comentarios_admin']);
    } else {
      this.mensaje = 'Ingrese todos los campos!!';
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idComentario: new FormControl(data.idComentario),
          contenido: new FormControl(data.contenido),
          valoracion: new FormControl(data.valoracion),
          fechaCreacion: new FormControl(data.fechaCreacion),
          reservaEstacionamiento: new FormControl(
            data.reservaEstacionamiento.idReservaEstacionamiento
          ),
        });
      });
    }
  }
}
