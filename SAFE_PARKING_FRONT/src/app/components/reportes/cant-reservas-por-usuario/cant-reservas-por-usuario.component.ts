import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CantidadReservasPorUsuario } from 'src/app/models/cantidadReservasPorUsuario';
import { CantidadReservasPorUsuarioService } from 'src/app/services/cantidad-reservas-por-usuario.service';

@Component({
  selector: 'app-cant-reservas-por-usuario',
  templateUrl: './cant-reservas-por-usuario.component.html',
  styleUrls: ['./cant-reservas-por-usuario.component.css'],
})
export class CantReservasPorUsuarioComponent {
  dataSource: MatTableDataSource<CantidadReservasPorUsuario> =
    new MatTableDataSource();
  displayedColumns: string[] = ['nameUser', 'nameRole', 'quantityReservation'];

  constructor(
    private cantidadReservasService: CantidadReservasPorUsuarioService
  ) {}

  ngOnInit(): void {
    this.cantidadReservasService
      .CantidadReservasPorUsuario()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
