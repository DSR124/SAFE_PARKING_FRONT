import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { Membresia } from 'src/app/models/membresia';
import { MembresiaService } from 'src/app/services/membresia.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-creaedita-membresia',
  templateUrl: './creaedita-membresia.component.html',
  styleUrls: ['./creaedita-membresia.component.css'],
})
export class CreaeditaMembresiaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  membresia: Membresia = new Membresia();
  mensaje: string = '';
  minFecha: Date = moment().add(-0, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;

  /*tipos: { value: string, viewValue: string }[] = [{ value: 'dulce', viewValue: 'Dulce' }
    , { value: 'salado', viewValue: 'Salado' }]*/ //PARA USAR UN SELECT
  constructor(
    private mS: MembresiaService,
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
      tipoMembresia: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }
  registrar() {
    if (this.form.valid) {
      this.membresia.idMembresia = this.form.value.idMembresia;
      this.membresia.tipoMembresia = this.form.value.tipoMembresia;
      this.membresia.fechaInicio = this.form.value.fechaInicio;
      this.membresia.fechaFin = this.form.value.fechaFin;
      this.membresia.precio = this.form.value.precio;
      if (this.edicion) {
        this.mS.update(this.membresia).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.membresia).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['membresias/listar_admin_membresias']);
    } else {
      this.mensaje = 'Complete todos los campos!!!';
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
      this.mS.getById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idMembresia: new FormControl(data.idMembresia),
          tipoMembresia: new FormControl(data.tipoMembresia),
          fechaInicio: new FormControl(data.fechaInicio),
          fechaFin: new FormControl(data.fechaFin),
          precio: new FormControl(data.precio),
        });
      });
    }
  }
}
