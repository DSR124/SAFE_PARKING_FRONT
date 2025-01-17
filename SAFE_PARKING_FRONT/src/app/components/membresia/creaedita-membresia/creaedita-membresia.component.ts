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
import { LoginService } from 'src/app/services/login.service';

function precioPositivo(
  control: AbstractControl
): Promise<{ [key: string]: any } | null> {
  return new Promise((resolve) => {
    const precio = control.value;
    if (precio < 0) {
      resolve({ precioMenorOIgualACero: true });
    } else {
      resolve(null);
    }
  });
}

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
  role: string = '';

  tiposMembresia: { value: string; viewValue: string }[] = [
    { value: 'freeconductor', viewValue: 'Free Conductor' },
    { value: 'freearendador', viewValue: 'Free Arrendador' },
    { value: 'vipconductor', viewValue: 'VIP Conductor' },
    { value: 'viparrendador', viewValue: 'VIP Arrendador' },
  ];
  constructor(
    private mS: MembresiaService,
    private router: Router,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idMembresia: [''],
      tipoMembresia: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      precio: ['', Validators.required, precioPositivo],
    });
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
        alert('Se Modificó correctamente');
      } else {
        this.mS.insert(this.membresia).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
        alert('Se registro correctamente');
      }
      this.router.navigate(['components/membresias/listar_admin_membresias']);
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
        this.form.patchValue({
          idMembresia: data.idMembresia,
          tipoMembresia: data.tipoMembresia,
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin,
          precio: data.precio,
        });
      });
    }
  }
  validateDates(formControl: FormControl): { [key: string]: any } | null {
    const startDate = formControl.get('fechaInicio')?.value;
    const endDate = formControl.value;

    if (startDate && endDate && endDate < startDate) {
      return { fechaFinMenorQueFechaInicio: true };
    }

    return null;
  }

  filterDates = (date: Date | null): boolean => {
    const startDate = this.form.get('fechaInicio')?.value;
    if (startDate && date) {
      return date > startDate;
    }
    return true;
  };

    //Para ocultar la barra

    mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

    toggleNavbar() {
      this.mostrarNavbar = !this.mostrarNavbar;
    }
    //Fin de ocultar la barra
  
  
}
