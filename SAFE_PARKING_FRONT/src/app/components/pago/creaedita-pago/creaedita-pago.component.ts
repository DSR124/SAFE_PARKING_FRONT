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
import { Pago } from 'src/app/models/pago';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';
import { PrecioTotalporMes } from '../../../models/cantidadPrecioTotalporMeS';

function precioTotalPositivo(control: FormControl) {
  const precio = control.value;

  if (isNaN(precio) || precio <= 0) {
    return { precioNoValido: true };
  }

  return null;
}

@Component({
  selector: 'app-creaedita-pago',
  templateUrl: './creaedita-pago.component.html',
  styleUrls: ['./creaedita-pago.component.css'],
})
export class CreaeditaPagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pago: Pago = new Pago();
  mensaje: string = '';
  listaReservaEstacionamientos: ReservaEstacionamiento[] = [];

  //Para edicion
  edicion: boolean = false;
  id: number = 0;

  tipoPago: { value: string; viewValue: string }[] = [
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Tarjeta de credito', viewValue: 'Tarjeta de credito' },
    { value: 'Tarjeta de debito', viewValue: 'Tarjeta de debito' },
    { value: 'Paypal', viewValue: 'Paypal' },
    { value: 'Cuenta bancaria', viewValue: 'Cuenta bancaria' },
    { value: 'Yape', viewValue: 'Yape' },
    { value: 'Otros', viewValue: 'Otros' },
  ];
  role: string = '';

  constructor(
    private pS: PagoService,
    private r_eS: ReservaEstacionamientoService,
    private router: Router, //Para Navegar
    private formBuilder: FormBuilder, //private route: ActivatedRoute //Para editar
    public route: ActivatedRoute, //Para editar
    private loginService: LoginService
  ) { }
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
  ngOnInit(): void {
    //Nuevo Para Editar
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idPago: [''], //Para editar debe ser asi
      fechaEmision: [new Date(), Validators.required],
      precioTotal: ['', [Validators.required, precioTotalPositivo]],
      tipoPago: ['', Validators.required],
      reservaEstacionamiento: ['', Validators.required],
    });
    //Importante para cargar datos
    this.r_eS.list().subscribe((data) => {
      this.listaReservaEstacionamientos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.pago.idPago = this.form.value.idPago;
      this.pago.fechaEmision = this.form.value.fechaEmision;
      this.pago.tipoPago = this.form.value.tipoPago;
      this.pago.precioTotal =
        parseInt(this.form.value.precioTotal) +
        parseInt(this.form.value.precioTotal) * 0.18;
      this.pago.reservaEstacionamiento.idReservaEstacionamiento =
        this.form.value.reservaEstacionamiento; //dessert.idDessert -> Se utiliza el ID por que desde la BD se maneja con ello
      if (this.edicion) {
        this.pS.update(this.pago).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
        alert('Se modificó correctamente');
      } else {
        //Pasamos un objeto del tipo Ingredient por que en el Service fue declarado asi
        this.pS.insert(this.pago).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
        alert('Se registró correctamente');
      }
      this.router.navigate(['components/pagos/listar-admin-pagos']); //Esta ruta la sacamos del ROUTING MODULE
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
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
      this.pS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idPago: data.idPago,
          fechaEmision: data.fechaEmision,
          precioTotal: data.precioTotal,
          tipoPago: data.tipoPago,
          reservaEstacionamiento: data.reservaEstacionamiento.idReservaEstacionamiento,
        });
      });
    }
  }

  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
}
