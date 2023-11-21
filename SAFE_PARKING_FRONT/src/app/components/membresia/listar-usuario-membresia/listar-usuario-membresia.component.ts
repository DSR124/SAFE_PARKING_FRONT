import { Component, OnInit, ViewChild } from '@angular/core';
import { Membresia } from 'src/app/models/membresia';
import { MembresiaService } from 'src/app/services/membresia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Observable, Observer } from 'rxjs';
export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-listar-usuario-membresia',
  templateUrl: './listar-usuario-membresia.component.html',
  styleUrls: ['./listar-usuario-membresia.component.css'],
})
export class ListarUsuarioMembresiaComponent implements OnInit {
  memberships: Membresia[] = [];
  asyncTabs: Observable<ExampleTab[]>;
  tabIndex = 0;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(
    private membershipService: MembresiaService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'First', content: 'Content 1' },
          { label: 'Second', content: 'Content 2' },
          { label: 'Third', content: 'Content 3' },
        ]);
        observer.complete();
      }, 1000);
    });

  }

  ngOnInit() {
    this.membershipService.list().subscribe((memberships) => {
      this.memberships = memberships;
    });
  }
  editMembership(membership: Membresia) {
    // Redireccionar al usuario al apartado de registro de usuario, pasando el ID de la membresía como parámetro.
    this.router.navigate([`registrar_usuario`]);
  }
  
  //Para ocultar la barra

  mostrarNavbar = false; // Variable de estado para controlar la visibilidad de la barra

  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }
  //Fin de ocultar la barra
  navegarSiguiente(): void {
    if (this.tabGroup) {
      this.tabIndex = (this.tabIndex + 1) % this.tabGroup._tabs.length;
      this.tabGroup.selectedIndex = this.tabIndex;
    }
  }
  onTabChange(event: MatTabChangeEvent): void {
    // Puedes agregar lógica aquí si es necesario
    console.log('Cambio de pestaña', event.index);
  }


}
