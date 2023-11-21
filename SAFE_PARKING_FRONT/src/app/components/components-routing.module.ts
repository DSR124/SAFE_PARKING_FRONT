import { RouterModule, Routes } from '@angular/router';
import { LocalizacionesComponent } from './localizaciones/localizaciones.component';
import { CreaeditaLocalizacionesComponent } from './localizaciones/creaedita-localizaciones/creaedita-localizaciones.component';
import { ListarusuarioLocalizacionesComponent } from './localizaciones/listar-usuario-localizaciones/listar-usuario-localizaciones.component';
import { BuscarLocalizacionesComponent } from './localizaciones/buscar-localizaciones/buscar-localizaciones.component';
import { ListarAdminLocalizacionesComponent } from './localizaciones/listar-admin-localizaciones/listar-admin-localizaciones.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { CreaeditaComentarioComponent } from './comentario/creaedita-comentario/creaedita-comentario.component';
import { ListarAdminComentarioComponent } from './comentario/listar-admin-comentario/listar-admin-comentario.component';
import { BuscarComentariosComponent } from './comentario/buscar-comentarios/buscar-comentarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { CreaeditaVehiculosComponent } from './vehiculos/creaedita-vehiculos/creaedita-vehiculos.component';
import { BuscarVehiculosComponent } from './vehiculos/buscar-vehiculos/buscar-vehiculos.component';
import { ListarAdminVehiculosComponent } from './vehiculos/listar-admin-vehiculos/listar-admin-vehiculos.component';
import { MembresiaComponent } from './membresia/membresia.component';
import { CreaeditaMembresiaComponent } from './membresia/creaedita-membresia/creaedita-membresia.component';
import { ListarUsuarioMembresiaComponent } from './membresia/listar-usuario-membresia/listar-usuario-membresia.component';
import { BuscarMembresiaComponent } from './membresia/buscar-membresia/buscar-membresia.component';
import { ListarAdminMembresiaComponent } from './membresia/listar-admin-membresia/listar-admin-membresia.component';
import { IncidenteComponent } from './incidente/incidente.component';
import { ListarAdminIncidenteComponent } from './incidente/listar-admin-incidente/listar-admin-incidente.component';
import { CreaeditaIncidenteComponent } from './incidente/creaedita-incidente/creaedita-incidente.component';
import { BuscarIncidenteComponent } from './incidente/buscar-incidente/buscar-incidente.component';
import { HorarioComponent } from './horario/horario.component';
import { CreaeditaHorarioComponent } from './horario/creaedita-horario/creaedita-horario.component';
import { ListarUsuarioHorarioComponent } from './horario/listar-usuario-horario/listar-usuario-usuario-horario.component';
import { BuscarHorarioComponent } from './horario/buscar-horario/buscar-horario.component';
import { ListarAdminHorarioComponent } from './horario/listar-admin-horario/listar-admin-horario.component';
import { HorarioEstacionamientoComponent } from './horario-estacionamiento/horario-estacionamiento.component';
import { CreaeditaHorarioEstacionamientoComponent } from './horario-estacionamiento/creaedita-horario-estacionamiento/creaedita-horario-estacionamiento.component';
import { BuscarHorarioEstacionamientoComponent } from './horario-estacionamiento/buscar-horario-estacionamiento/buscar-horario-estacionamiento.component';
import { ListarAdminHorarioEstacionamientoComponent } from './horario-estacionamiento/listar-admin-horario-estacionamiento/listar-admin-horario-estacionamiento.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CreaeditaUsuarioComponent } from './usuarios/creaedita-usuario/creaedita-usuario.component';
import { listarAdminUsuarioComponent } from './usuarios/listar-admin-usuario/listar-admin-usuario.component';
import { BuscarUsuariosComponent } from './usuarios/buscar-usuarios/buscar-usuarios.component';
import { RolComponent } from './rol/rol.component';
import { CreaeditaRolComponent } from './rol/creaedita-rol/creaedita-rol.component';
import { ListarAdminRolComponent } from './rol/listar-admin-rol/listar-admin-rol.component';
import { BuscarRolComponent } from './rol/buscar-rol/buscar-rol.component';
import { PagoComponent } from './pago/pago.component';
import { CreaeditaPagoComponent } from './pago/creaedita-pago/creaedita-pago.component';
import { ListarAdminPagoComponent } from './pago/listar-admin-pago/listar-admin-pago.component';
import { BuscarPagoComponent } from './pago/buscar-pago/buscar-pago.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CantIncidentesPorRolComponent } from './reportes/cant-incidentes-por-rol/cant-incidentes-por-rol.component';
import { CantReservasPorFechaComponent } from './reportes/cant-reservas-por-fecha/cant-reservas-por-fecha.component';
import { CantReservasPorTipoPagoComponent } from './reportes/cant-reservas-por-tipo-pago/cant-reservas-por-tipo-pago.component';
import { CantReservasPorUsuarioComponent } from './reportes/cant-reservas-por-usuario/cant-reservas-por-usuario.component';
import { ReservaEstacionamientoComponent } from './reserva-estacionamiento/reserva-estacionamiento.component';
import { ListarAdminReservaEstacionamientoComponent } from './reserva-estacionamiento/listar-admin-reserva-estacionamiento/listar-admin-reserva-estacionamiento.component';
import { CreaeditaReservaEstacionamientoComponent } from './reserva-estacionamiento/creaedita-reserva-estacionamiento/creaedita-reserva-estacionamiento.component';
import { BuscarReservaEstacionamientoComponent } from './reserva-estacionamiento/buscar-reserva-estacionamiento/buscar-reserva-estacionamiento.component';
import { EstacionamientoComponent } from './estacionamiento/estacionamiento.component';
import { CreaeditaEstacionamientoComponent } from './estacionamiento/creaedita-estacionamiento/creaedita-estacionamiento.component';
import { ListarAdminEstacionamientoComponent } from './estacionamiento/listar-admin-estacionamiento/listar-admin-estacionamiento.component';
import { BuscarEstacionamientoComponent } from './estacionamiento/buscar-estacionamiento/buscar-estacionamiento.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeArrendadorComponent } from './home-arrendador/home-arrendador.component';
import { HomeConductorComponent } from './home-conductor/home-conductor.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { NgModule } from '@angular/core';
import { NavbarAdministradorComponent } from './navbar-administrador/navbar-administrador.component';
import { CantPrecioTotalPorMesComponent } from './reportes/cant-precio-total-por-mes/cant-precio-total-por-mes.component';
import { ListarUsuarioEstacionamientoComponent } from './estacionamiento/listar-usuario-estacionamiento/listar-usuario-estacionamiento.component';
import { DetalleEstacionamientoComponent } from './estacionamiento/detalle-estacionamiento/detalle-estacionamiento.component';
import { ProfileComponent } from './profile/profile.component';
import { ModificarUsuarioComponent } from './usuarios/modificar-usuario/modificar-usuario.component';
import { ListarUsuarioVehiculosComponent } from './vehiculos/listar-usuario-vehiculos/listar-usuario-vehiculos.component';
import { ListarUsuarioComentarioComponent } from './comentario/listar-usuario-comentario/listar-usuario-comentario.component';
import { ListaMapaEstacionamientoComponent } from './estacionamiento/lista-mapa-estacionamiento/lista-mapa-estacionamiento.component';
import { CreaeditaRolAdminComponent } from './rol/creaedita-rol-admin/creaedita-rol-admin.component';

const routes: Routes = [
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

  // comentarios
  {
    path: 'comentarios',
    component: ComentarioComponent,
    children: [
      {
        path: 'registrar_comentarios',
        component: CreaeditaComentarioComponent,
      },
      {
        path: 'listar_comentarios_admin',
        component: ListarAdminComentarioComponent,
      },
      {
        path: 'listar_comentarios_user',
        component: ListarUsuarioComentarioComponent,
      },

      {
        path: 'listar_comentarios_admin/ediciones/:id',
        component: CreaeditaComentarioComponent,
      },

      {
        path: 'buscar_comentarios',
        component: BuscarComentariosComponent,
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
        path: 'listar_usuario_vehiculos',
        component: ListarUsuarioVehiculosComponent,
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
        component: ModificarUsuarioComponent,
      },
      {
        path: 'registrar_usuarios_SignUp',
        component: CreaeditaUsuarioComponent,
      },
      {
        path: 'listar_admin_usuarios',
        component: listarAdminUsuarioComponent,
      },
      {
        path: 'listar_admin_usuarios/ediciones/:id',
        component: ModificarUsuarioComponent,
      },

      {
        path: 'buscar_usuarios',
        component: BuscarUsuariosComponent,
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
        component: CreaeditaRolAdminComponent,
      },
      {
        path: 'buscar-roles',
        component: BuscarRolComponent,
      },
      {
        path: 'registrar_roles_admin',
        component: CreaeditaRolAdminComponent,
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
      {
        path: 'cant-precio-por-mes',
        component: CantPrecioTotalPorMesComponent,
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
      },
    ],
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
        path: 'listar_usuario_estacionamientos',
        component: ListarUsuarioEstacionamientoComponent,
      },
      {
        path: 'listar_admin_estacionamientos/ediciones/:id',
        component: CreaeditaEstacionamientoComponent,
      },
      {
        path: 'detalle_estacionamiento/:id',
        component: DetalleEstacionamientoComponent,
      },
      {
        path: 'buscar-estacionamiento',
        component: BuscarEstacionamientoComponent,
      },
      {
        path: 'listar-mapa-estacionamiento',
        component: ListaMapaEstacionamientoComponent,
      },
    ],
  },
  // apartados

  { path: 'home_arrendador', component: HomeArrendadorComponent },
  {
    path: 'home_conductor',
    component: HomeConductorComponent,
  },
  {
    path: 'home_administrador',
    component: HomeAdministradorComponent,
  },
  {
    path: 'navbar_admin',
    component: NavbarAdministradorComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
