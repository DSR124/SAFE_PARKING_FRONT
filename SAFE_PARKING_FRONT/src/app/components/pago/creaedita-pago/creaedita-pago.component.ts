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
import { PagoService } from 'src/app/services/pago.service';
import { ReservaEstacionamientoService } from 'src/app/services/reserva-estacionamiento.service';

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

  constructor(
    private pS: PagoService,
    private r_eS: ReservaEstacionamientoService,
    private router: Router, //Para Navegar
    private formBuilder: FormBuilder, //private route: ActivatedRoute //Para editar
    private route: ActivatedRoute //Para editar
  ) {}

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
      this.pago.precioTotal = this.form.value.precioTotal;
      this.pago.tipoPago = this.form.value.tipoPago;
      this.pago.reservaEstacionamiento.idReservaEstacionamiento =
        this.form.value.reservaEstacionamiento; //dessert.idDessert -> Se utiliza el ID por que desde la BD se maneja con ello
      if (this.edicion) {
        this.pS.update(this.pago).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        //Pasamos un objeto del tipo Ingredient por que en el Service fue declarado asi
        this.pS.insert(this.pago).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['pagos/listar-admin-pagos']); //Esta ruta la sacamos del ROUTING MODULE
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
        this.form = new FormGroup({
          idPago: new FormControl(data.idPago),
          fechaEmision: new FormControl(data.fechaEmision),
          precioTotal: new FormControl(data.precioTotal),
          tipoPago: new FormControl(data.tipoPago),
          reservaEstacionamiento: new FormControl(
            data.reservaEstacionamiento.idReservaEstacionamiento
          ), //Siempre es ID
        });
      });
    }
  }
}
