import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from 'src/app/services/horario.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-usuario-horario',
  templateUrl: './listar-usuario-horario.component.html',
  styleUrls: ['./listar-usuario-horario.component.css'],
})
export class ListarUsuarioHorarioComponent implements OnInit {
  horariosPorFecha: { fecha: string; horarios: Horario[] }[] = [];
  horasDelDia: string[] = this.generarHorasDelDia(); // Array de horas del día
  role: string = '';

  constructor(
    private horarioService: HorarioService,
    private loginService: LoginService,

    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.horarioService.list().subscribe((horarios: Horario[]) => {
      this.organizarHorariosPorFecha(horarios);
    });
  }

  // Generar horas del día en formato HH:00
  generarHorasDelDia(): string[] {
    const horas: string[] = [];
    for (let i = 0; i < 24; i++) {
      const hora = `${String(i).padStart(2, '0')}:00`;
      horas.push(hora);
    }
    return horas;
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
  organizarHorariosPorFecha(horarios: Horario[]) {
    const grouped: { [fecha: string]: Horario[] } = {};

    horarios.forEach((horario: Horario) => {
      if (typeof horario.fecha === 'string') {
        horario.fecha = new Date(horario.fecha);
      }

      if (horario.fecha instanceof Date && !isNaN(horario.fecha.getTime())) {
        const fecha = horario.fecha.toISOString().split('T')[0];
        if (!grouped[fecha]) {
          grouped[fecha] = [];
        }
        grouped[fecha].push(horario);
      } else {
        console.error(
          'Error: La fecha no es un objeto Date válido',
          horario.fecha
        );
      }
    });

    this.horariosPorFecha = Object.keys(grouped).map((fecha) => ({
      fecha,
      horarios: grouped[fecha],
    }));
  }
  diasDeLaSemana: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  obtenerNombreDia(fecha: string): string {
    const diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];

    // Ajuste de la zona horaria
    const date = new Date(fecha);
    date.setDate(date.getDate() + 1); // Sumar un día

    const nombreDia = diasSemana[date.getDay()];
    return nombreDia;
  }

  obtenerIdHorario(id: number) {
    console.log('ID del horario:', id);
    // Aquí puedes realizar otras acciones con el ID del horario
  }

  compararHorarioConHora(horario: Horario, hora: string): boolean {
    const horaInicio = parseInt(horario.horaApertura.substring(0, 2));
    const horaCierre = parseInt(horario.horaCierre.substring(0, 2));
    const horaSeleccionada = parseInt(hora);

    // Verificar si la hora seleccionada está dentro del rango de horarios
    return horaSeleccionada >= horaInicio && horaSeleccionada < horaCierre;
  }
}
