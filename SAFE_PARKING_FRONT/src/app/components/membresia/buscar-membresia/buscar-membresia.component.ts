import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Membresia } from 'src/app/models/membresia';
import { MembresiaService } from 'src/app/services/membresia.service';

@Component({
  selector: 'app-buscar-membresia',
  templateUrl: './buscar-membresia.component.html',
  styleUrls: ['./buscar-membresia.component.css']
})
export class BuscarMembresiaComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  membresia: Membresia = new Membresia();
  id: number = 0;
  idNoEncontrado: boolean = false; // Variable para controlar si el ID no se encuentra

  constructor(
    private membresiaService: MembresiaService,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.buscar();
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
