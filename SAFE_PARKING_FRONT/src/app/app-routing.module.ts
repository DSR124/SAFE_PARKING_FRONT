import { CantReservasPorUsuarioComponent } from './components/reportes/cant-reservas-por-usuario/cant-reservas-por-usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuarios/creaedita-usuario/creaedita-usuario.component';
import { CreaeditaMembresiaComponent } from './components/membresia/creaedita-membresia/creaedita-membresia.component';
import { BuscarMembresiaComponent } from './components/membresia/buscar-membresia/buscar-membresia.component';
import { HomeAdministradorComponent } from './components/home-administrador/home-administrador.component';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { LocalizacionesComponent } from './components/localizaciones/localizaciones.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { CreaeditaLocalizacionesComponent } from './components/localizaciones/creaedita-localizaciones/creaedita-localizaciones.component';
import { BuscarLocalizacionesComponent } from './components/localizaciones/buscar-localizaciones/buscar-localizaciones.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { CreaeditaVehiculosComponent } from './components/vehiculos/creaedita-vehiculos/creaedita-vehiculos.component';
import { BuscarVehiculosComponent } from './components/vehiculos/buscar-vehiculos/buscar-vehiculos.component';
import { CreaeditaHorarioComponent } from './components/horario/creaedita-horario/creaedita-horario.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HomeArrendadorComponent } from './components/home-arrendador/home-arrendador.component';
import { HomeConductorComponent } from './components/home-conductor/home-conductor.component';
import { NgModule } from '@angular/core';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CantIncidentesPorRolComponent } from './components/reportes/cant-incidentes-por-rol/cant-incidentes-por-rol.component';
import { CantReservasPorFechaComponent } from './components/reportes/cant-reservas-por-fecha/cant-reservas-por-fecha.component';
import { CantReservasPorTipoPagoComponent } from './components/reportes/cant-reservas-por-tipo-pago/cant-reservas-por-tipo-pago.component';
import { ListarusuarioLocalizacionesComponent } from './components/localizaciones/listar-usuario-localizaciones/listar-usuario-localizaciones.component';
import { ListarAdminLocalizacionesComponent } from './components/localizaciones/listar-admin-localizaciones/listar-admin-localizaciones.component';
import { ListarAdminVehiculosComponent } from './components/vehiculos/listar-admin-vehiculos/listar-admin-vehiculos.component';
import { ListarUsuarioMembresiaComponent } from './components/membresia/listar-usuario-membresia/listar-usuario-membresia.component';
import { ListarUsuarioHorarioComponent } from './components/horario/listar-usuario-horario/listar-usuario-usuario-horario.component';
import { ListarAdminHorarioComponent } from './components/horario/listar-admin-horario/listar-admin-horario.component';
import { HorarioComponent } from './components/horario/horario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { listarAdminUsuarioComponent } from './components/usuarios/listar-admin-usuario/listar-admin-usuario.component';
import { RolComponent } from './components/rol/rol.component';
import { CreaeditaRolComponent } from './components/rol/creaedita-rol/creaedita-rol.component';
import { ListarAdminRolComponent } from './components/rol/listar-admin-rol/listar-admin-rol.component';
import { PagoComponent } from './components/pago/pago.component';
import { CreaeditaPagoComponent } from './components/pago/creaedita-pago/creaedita-pago.component';
import { ListarAdminPagoComponent } from './components/pago/listar-admin-pago/listar-admin-pago.component';
import { BuscarPagoComponent } from './components/pago/buscar-pago/buscar-pago.component';
import { BuscarRolComponent } from './components/rol/buscar-rol/buscar-rol.component';
import { HorarioEstacionamientoComponent } from './components/horario-estacionamiento/horario-estacionamiento.component';
import { CreaeditaHorarioEstacionamientoComponent } from './components/horario-estacionamiento/creaedita-horario-estacionamiento/creaedita-horario-estacionamiento.component';
import { ListarAdminHorarioEstacionamientoComponent } from './components/horario-estacionamiento/listar-admin-horario-estacionamiento/listar-admin-horario-estacionamiento.component';
import { BuscarHorarioComponent } from './components/horario/buscar-horario/buscar-horario.component';
import { BuscarHorarioEstacionamientoComponent } from './components/horario-estacionamiento/buscar-horario-estacionamiento/buscar-horario-estacionamiento.component';
import { ListarAdminMembresiaComponent } from './components/membresia/listar-admin-membresia/listar-admin-membresia.component';
import { IncidenteComponent } from './components/incidente/incidente.component';
import { ListarAdminIncidenteComponent } from './components/incidente/listar-admin-incidente/listar-admin-incidente.component';
import { CreaeditaIncidenteComponent } from './components/incidente/creaedita-incidente/creaedita-incidente.component';
import { BuscarIncidenteComponent } from './components/incidente/buscar-incidente/buscar-incidente.component';
import { ReservaEstacionamientoComponent } from './components/reserva-estacionamiento/reserva-estacionamiento.component';
import { ListarAdminReservaEstacionamientoComponent } from './components/reserva-estacionamiento/listar-admin-reserva-estacionamiento/listar-admin-reserva-estacionamiento.component';
import { CreaeditaReservaEstacionamientoComponent } from './components/reserva-estacionamiento/creaedita-reserva-estacionamiento/creaedita-reserva-estacionamiento.component';
import { EstacionamientoComponent } from './components/estacionamiento/estacionamiento.component';
import { CreaeditaEstacionamientoComponent } from './components/estacionamiento/creaedita-estacionamiento/creaedita-estacionamiento.component';
import { ListarAdminEstacionamientoComponent } from './components/estacionamiento/listar-admin-estacionamiento/listar-admin-estacionamiento.component';
import { BuscarEstacionamientoComponent } from './components/estacionamiento/buscar-estacionamiento/buscar-estacionamiento.component';
import { BuscarReservaEstacionamientoComponent } from './components/reserva-estacionamiento/buscar-reserva-estacionamiento/buscar-reserva-estacionamiento.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

  // localizaciones
  {
    path: 'localizaciones',
    component: LocalizacionesComponent,
    children: [
      {
        path: 'registrar_localizaciones',
        component: CreaeditaLocalizacionesComponent,
      },
      {
        path: 'listar_usuario_localizaciones',
        component: ListarusuarioLocalizacionesComponent,
      },
      {
        path: 'buscar_localizaciones',
        component: BuscarLocalizacionesComponent,
      },
      {
        path: 'listar_admin_localizaciones',
        component: ListarAdminLocalizacionesComponent,
      },
      {
        path: 'listar_admin_localizaciones/ediciones/:id',
        component: CreaeditaLocalizacionesComponent,
      },
    ],
  },

  // vehiculos
  {
    path: 'vehiculos',
    component: VehiculosComponent,
    children: [
      {
        path: 'registrar_vehiculos',
        component: CreaeditaVehiculosComponent,
      },
      {
        path: 'buscar_vehiculos',
        component: BuscarVehiculosComponent,
      },
      {
        path: 'listar_admin_vehiculos',
        component: ListarAdminVehiculosComponent,
      },
      {
        path: 'listar_admin_vehiculos/ediciones/:id',
        component: CreaeditaVehiculosComponent,
      },
    ],
  },

  // membresias
  {
    path: 'membresias',
    component: MembresiaComponent,
    children: [
      {
        path: 'registrar_membresias',
        component: CreaeditaMembresiaComponent,
      },
      {
        path: 'listar_usuario_membresias',
        component: ListarUsuarioMembresiaComponent,
      },
      {
        path: 'buscar_membresias',
        component: BuscarMembresiaComponent,
      },
      {
        path: 'listar_admin_membresias',
        component: ListarAdminMembresiaComponent,
      },
      {
        path: 'listar_admin_membresias/ediciones/:id',
        component: CreaeditaMembresiaComponent,
      },
    ],
  },
  // Incidentes
  {
    path: 'incidentes',
    component: IncidenteComponent,
    children: [
      {
        path: 'listar_admin_incidentes',
        component: ListarAdminIncidenteComponent,
      },
      {
        path: 'registrar_incidentes',
        component: CreaeditaIncidenteComponent,
      },
      {
        path: 'listar_admin_incidentes/ediciones/:id',
        component: CreaeditaIncidenteComponent,
      },
      {
        path: 'buscar_incidentes',
        component: BuscarIncidenteComponent,
      },
    ],
  },
  //Horarios

  {
    path: 'horarios',
    component: HorarioComponent,
    children: [
      {
        path: 'registrar_horarios',
        component: CreaeditaHorarioComponent,
      },
      {
        path: 'listar_usuario_horarios',
        component: ListarUsuarioHorarioComponent,
      },
      {
        path: 'buscar_horarios',
        component: BuscarHorarioComponent,
      },
      {
        path: 'listar_admin_horarios',
        component: ListarAdminHorarioComponent,
      },
      {
        path: 'listar_admin_horarios/ediciones/:id',
        component: CreaeditaHorarioComponent,
      },
    ],
  },
  //Horarios

  {
    path: 'horarios_estacionamiento',
    component: HorarioEstacionamientoComponent,
    children: [
      {
        path: 'registrar_horarios_estacionamiento',
        component: CreaeditaHorarioEstacionamientoComponent,
      },
      {
        path: 'buscar_horarios_estacionamiento',
        component: BuscarHorarioEstacionamientoComponent,
      },
      {
        path: 'listar_admin_horarios_estacionamiento',
        component: ListarAdminHorarioEstacionamientoComponent,
      },
      {
        path: 'listar_admin_horarios_estacionamiento/ediciones/:id',
        component: CreaeditaHorarioEstacionamientoComponent,
      },
    ],
  },

  // usuarios
  {
    path: 'usuarios',
    component: UsuariosComponent,
    children: [
      {
        path: 'registrar_usuarios',
        component: CreaeditaUsuarioComponent,
      },
      {
        path: 'listar_admin_usuarios',
        component: listarAdminUsuarioComponent,
      },
    ],
  },
  //roles
  {
    path: 'roles',
    component: RolComponent,
    children: [
      {
        path: 'registrar_roles',
        component: CreaeditaRolComponent,
      },
      {
        path: 'listar-admin-roles',
        component: ListarAdminRolComponent,
      },
      {
        path: 'listar-admin-roles/ediciones/:id',
        component: CreaeditaRolComponent,
      },
      {
        path: 'buscar-roles',
        component: BuscarRolComponent,
      },
    ],
  },

  //Pagos
  {
    path: 'pagos',
    component: PagoComponent,
    children: [
      {
        path: 'registrar_pagos',
        component: CreaeditaPagoComponent,
      },
      {
        path: 'listar-admin-pagos',
        component: ListarAdminPagoComponent,
      },
      {
        path: 'listar-admin-pagos/ediciones/:id',
        component: CreaeditaPagoComponent,
      },
      {
        path: 'buscar-pagos',
        component: BuscarPagoComponent,
      },
    ],
  },

  //Reportes - Queries
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'cant-incidentes-por-rol',
        component: CantIncidentesPorRolComponent,
      },
      {
        path: 'cant-reservas-por-fecha',
        component: CantReservasPorFechaComponent,
      },
      {
        path: 'cant-reservas-por-tipoPago',
        component: CantReservasPorTipoPagoComponent,
      },
      {
        path: 'cant-reservas-por-usuario',
        component: CantReservasPorUsuarioComponent,

      },
    ],

  },

  //Reserva estacionamiento
  {
    path: 'reservaestacionamiento',
    component: ReservaEstacionamientoComponent,
    children: [
      {
        path: 'listar_admin_reserva_estacionamientos',
        component: ListarAdminReservaEstacionamientoComponent,
      },
      {
        path: 'registrar_reservas_estacionamientos',
        component: CreaeditaReservaEstacionamientoComponent,
      },
      {
        path: 'listar_admin_reserva_estacionamientos/ediciones/:id',
        component: CreaeditaReservaEstacionamientoComponent,
      },
      {
        path: 'buscar-reserva-estacionamiento',
        component: BuscarReservaEstacionamientoComponent,
      }
    ]
  },
  //Estacionamiento
  {
    path: 'estacionamiento',
    component: EstacionamientoComponent,
    children: [
      {
        path: 'registrar_estacionamientos',
        component: CreaeditaEstacionamientoComponent,
      },
      {
        path: 'listar_admin_estacionamientos',
        component: ListarAdminEstacionamientoComponent,
      },
      {
        path: 'listar_admin_estacionamientos/ediciones/:id',
        component: CreaeditaEstacionamientoComponent,
      },
      {
        path: 'buscar-estacionamiento',
        component: BuscarEstacionamientoComponent,
      }
    ]
  },
  // apartados
  { path: 'footer', component: FooterComponent },

  { path: 'vehiculos', component: VehiculosComponent },

  {
    path: 'navbar',
    component: NavbarComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'home-arrendador', component: HomeArrendadorComponent },
      {
        path: 'home-condutor',
        component: HomeConductorComponent,
      },
      {
        path: 'home_administrador',
        component: HomeAdministradorComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
