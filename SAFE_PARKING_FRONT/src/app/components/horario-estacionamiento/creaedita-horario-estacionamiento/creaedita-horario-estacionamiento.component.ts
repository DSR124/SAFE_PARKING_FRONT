import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estacionamiento } from 'src/app/models/estacionamiento';
import { Horario } from 'src/app/models/horario';
import { HorarioEstacionamiento } from 'src/app/models/horarioEstacionamiento';
import { EstacionamientoService } from 'src/app/services/estacionamiento.service';
import { HorarioEstacionamientoService } from 'src/app/services/horario-estacionamiento.service';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-creaedita-horario-estacionamiento',
  templateUrl: './creaedita-horario-estacionamiento.component.html',
  styleUrls: ['./creaedita-horario-estacionamiento.component.css'],
})
export class CreaeditaHorarioEstacionamientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  hro_est: HorarioEstacionamiento = new HorarioEstacionamiento();
  mensaje: string = '';
  listaHorario: Horario[] = [];
  listaEstacionamiento: Estacionamiento[] = [];

  constructor(
    private hS: HorarioService,
    private eS: EstacionamientoService,
    private heS: HorarioEstacionamientoService,

    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      estacionamiento: ['', Validators.required],
      horario: ['', Validators.required],
    });

    this.hS.list().subscribe((data) => {
      this.listaHorario = data;
    });
    this.eS.list().subscribe((data) => {
      this.listaEstacionamiento = data;
    });
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  aceptar(): void {
    if (this.form.valid) {
      this.hro_est.estacionamiento.idEstacionamiento =
        this.form.value.estacionamiento;
      this.hro_est.horario.idHorario = this.form.value.horario;

      this.heS.insert(this.hro_est).subscribe((data) => {
        this.heS.list().subscribe((data) => {
          this.heS.setList(data);
        });
      });

      this.router.navigate(['ingredients/listar']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
}
