import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Membresia } from 'src/app/models/membresia';
import { LoginService } from 'src/app/services/login.service';
import { MembresiaService } from 'src/app/services/membresia.service';

@Component({
  selector: 'app-buscar-membresia',
  templateUrl: './buscar-membresia.component.html',
  styleUrls: ['./buscar-membresia.component.css'],
})
export class BuscarMembresiaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  membresia: Membresia = new Membresia();
  id: number = 0;
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra
  role: string = '';

  constructor(
    private membresiaService: MembresiaService,
    public route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.buscar();
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
  buscar() {
    this.membresiaService.getById(this.id).subscribe(
      (data: Membresia) => {
        this.membresia = data;
      },
      (error) => {
        console.error('Error al obtener la membresía por ID:', error);
      }
    );
  }
}
