import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavbarAdministradorComponent } from './navbar-administrador/navbar-administrador.component';
import { NavbarArrendadorComponent } from './navbar-arrendador/navbar-arrendador.component';
import { NavbarConductorComponent } from './navbar-conductor/navbar-conductor.component';
import { HomeConductorComponent } from './home-conductor/home-conductor.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { HomeArrendadorComponent } from './home-arrendador/home-arrendador.component';
import { HomeComponent } from './home/home.component';
import { HorarioComponent } from './horario/horario.component';
import { CreaeditaHorarioComponent } from './horario/creaedita-horario/creaedita-horario.component';
import { ListarUsuarioHorarioComponent } from './horario/listar-usuario-horario/listar-usuario-usuario-horario.component';
import { ListarAdminHorarioComponent } from './horario/listar-admin-horario/listar-admin-horario.component';
import { BuscarHorarioComponent } from './horario/buscar-horario/buscar-horario.component';
import { LocalizacionesComponent } from './localizaciones/localizaciones.component';
import { BuscarLocalizacionesComponent } from './localizaciones/buscar-localizaciones/buscar-localizaciones.component';
import { CreaeditaLocalizacionesComponent } from './localizaciones/creaedita-localizaciones/creaedita-localizaciones.component';
import { ListarAdminLocalizacionesComponent } from './localizaciones/listar-admin-localizaciones/listar-admin-localizaciones.component';
import { ListarusuarioLocalizacionesComponent } from './localizaciones/listar-usuario-localizaciones/listar-usuario-localizaciones.component';
import { BuscarMembresiaComponent } from './membresia/buscar-membresia/buscar-membresia.component';
import { MembresiaComponent } from './membresia/membresia.component';
import { CreaeditaMembresiaComponent } from './membresia/creaedita-membresia/creaedita-membresia.component';
import { ListarAdminMembresiaComponent } from './membresia/listar-admin-membresia/listar-admin-membresia.component';
import { RolComponent } from './rol/rol.component';
import { ListarAdminRolComponent } from './rol/listar-admin-rol/listar-admin-rol.component';
import { BuscarRolComponent } from './rol/buscar-rol/buscar-rol.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { listarAdminUsuarioComponent } from './usuarios/listar-admin-usuario/listar-admin-usuario.component';
import { BuscarUsuariosComponent } from './usuarios/buscar-usuarios/buscar-usuarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { BuscarVehiculosComponent } from './vehiculos/buscar-vehiculos/buscar-vehiculos.component';
import { CreaeditaVehiculosComponent } from './vehiculos/creaedita-vehiculos/creaedita-vehiculos.component';
import { ListarAdminVehiculosComponent } from './vehiculos/listar-admin-vehiculos/listar-admin-vehiculos.component';
import { CantReservasPorFechaComponent } from './reportes/cant-reservas-por-fecha/cant-reservas-por-fecha.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CantReservasPorTipoPagoComponent } from './reportes/cant-reservas-por-tipo-pago/cant-reservas-por-tipo-pago.component';
import { CantReservasPorUsuarioComponent } from './reportes/cant-reservas-por-usuario/cant-reservas-por-usuario.component';
import { CantIncidentesPorRolComponent } from './reportes/cant-incidentes-por-rol/cant-incidentes-por-rol.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { CreaeditaComentarioComponent } from './comentario/creaedita-comentario/creaedita-comentario.component';
import { ListarAdminComentarioComponent } from './comentario/listar-admin-comentario/listar-admin-comentario.component';
import { ListarUsuarioComentarioComponent } from './comentario/listar-usuario-comentario/listar-usuario-comentario.component';
import { BuscarComentariosComponent } from './comentario/buscar-comentarios/buscar-comentarios.component';
import { HorarioEstacionamientoComponent } from './horario-estacionamiento/horario-estacionamiento.component';
import { CreaeditaHorarioEstacionamientoComponent } from './horario-estacionamiento/creaedita-horario-estacionamiento/creaedita-horario-estacionamiento.component';
import { ListarAdminHorarioEstacionamientoComponent } from './horario-estacionamiento/listar-admin-horario-estacionamiento/listar-admin-horario-estacionamiento.component';
import { ListarUsuarioHorarioEstacionamientoComponent } from './horario-estacionamiento/listar-usuario-horario-estacionamiento/listar-usuario-horario-estacionamiento.component';
import { BuscarHorarioEstacionamientoComponent } from './horario-estacionamiento/buscar-horario-estacionamiento/buscar-horario-estacionamiento.component';
import { ReservaEstacionamientoComponent } from './reserva-estacionamiento/reserva-estacionamiento.component';
import { CreaeditaReservaEstacionamientoComponent } from './reserva-estacionamiento/creaedita-reserva-estacionamiento/creaedita-reserva-estacionamiento.component';
import { ListarAdminReservaEstacionamientoComponent } from './reserva-estacionamiento/listar-admin-reserva-estacionamiento/listar-admin-reserva-estacionamiento.component';
import { ListarUsuarioReservaEstacionamientoComponent } from './reserva-estacionamiento/listar-usuario-reserva-estacionamiento/listar-usuario-reserva-estacionamiento.component';
import { PagoComponent } from './pago/pago.component';
import { CreaeditaPagoComponent } from './pago/creaedita-pago/creaedita-pago.component';
import { ListarAdminPagoComponent } from './pago/listar-admin-pago/listar-admin-pago.component';
import { ListarUsuarioPagoComponent } from './pago/listar-usuario-pago/listar-usuario-pago.component';
import { BuscarPagoComponent } from './pago/buscar-pago/buscar-pago.component';
import { IncidenteComponent } from './incidente/incidente.component';
import { ListarUsuarioIncidenteComponent } from './incidente/listar-usuario-incidente/listar-usuario-incidente.component';
import { ListarAdminIncidenteComponent } from './incidente/listar-admin-incidente/listar-admin-incidente.component';
import { CreaeditaIncidenteComponent } from './incidente/creaedita-incidente/creaedita-incidente.component';
import { BuscarIncidenteComponent } from './incidente/buscar-incidente/buscar-incidente.component';
import { EstacionamientoComponent } from './estacionamiento/estacionamiento.component';
import { ListarUsuarioEstacionamientoComponent } from './estacionamiento/listar-usuario-estacionamiento/listar-usuario-estacionamiento.component';
import { ListarAdminEstacionamientoComponent } from './estacionamiento/listar-admin-estacionamiento/listar-admin-estacionamiento.component';
import { CreaeditaEstacionamientoComponent } from './estacionamiento/creaedita-estacionamiento/creaedita-estacionamiento.component';
import { BuscarEstacionamientoComponent } from './estacionamiento/buscar-estacionamiento/buscar-estacionamiento.component';
import { BuscarReservaEstacionamientoComponent } from './reserva-estacionamiento/buscar-reserva-estacionamiento/buscar-reserva-estacionamiento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorMaterialModule } from 'ngx-color/material';
import { ComponentsRoutingModule } from './components-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CantPrecioTotalPorMesComponent } from './reportes/cant-precio-total-por-mes/cant-precio-total-por-mes.component';
import { DetalleEstacionamientoComponent } from './estacionamiento/detalle-estacionamiento/detalle-estacionamiento.component';
import { ProfileComponent } from './profile/profile.component';
import { NgChartsModule } from 'ng2-charts';
import { ModificarUsuarioComponent } from './usuarios/modificar-usuario/modificar-usuario.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { ListarUsuarioVehiculosComponent } from './vehiculos/listar-usuario-vehiculos/listar-usuario-vehiculos.component';
import { ListaMapaEstacionamientoComponent } from './estacionamiento/lista-mapa-estacionamiento/lista-mapa-estacionamiento.component';
import { CreaeditaRolAdminComponent } from './rol/creaedita-rol-admin/creaedita-rol-admin.component';
@NgModule({
  declarations: [
    //Nav Bars
    NavbarAdministradorComponent,
    NavbarArrendadorComponent,
    NavbarConductorComponent,

    //Homes
    HomeConductorComponent,
    HomeAdministradorComponent,
    HomeArrendadorComponent,
    //Horario
    HorarioComponent,
    CreaeditaHorarioComponent,
    ListarUsuarioHorarioComponent,
    ListarAdminHorarioComponent,
    BuscarHorarioComponent,

    //Localizaciones
    LocalizacionesComponent,
    BuscarLocalizacionesComponent,
    CreaeditaLocalizacionesComponent,
    ListarAdminLocalizacionesComponent,
    ListarusuarioLocalizacionesComponent,

    //Membresia
    MembresiaComponent,
    BuscarMembresiaComponent,
    CreaeditaMembresiaComponent,
    ListarAdminMembresiaComponent,

    //Rol
    RolComponent,

    ListarAdminRolComponent,
    BuscarRolComponent,

    //Usuarios
    UsuariosComponent,
    listarAdminUsuarioComponent,
    BuscarUsuariosComponent,
    ModificarUsuarioComponent,

    //Vehiculos
    VehiculosComponent,
    BuscarVehiculosComponent,
    CreaeditaVehiculosComponent,
    ListarAdminVehiculosComponent,
    ListarUsuarioVehiculosComponent,

    //Reportes
    ReportesComponent,
    CantReservasPorFechaComponent,
    CantReservasPorTipoPagoComponent,
    CantReservasPorUsuarioComponent,
    CantIncidentesPorRolComponent,
    CantPrecioTotalPorMesComponent,

    //Comentario
    ComentarioComponent,
    CreaeditaComentarioComponent,
    ListarAdminComentarioComponent,
    ListarUsuarioComentarioComponent,
    BuscarComentariosComponent,

    //Horario-Estacionamiento
    HorarioEstacionamientoComponent,
    CreaeditaHorarioEstacionamientoComponent,
    ListarAdminHorarioEstacionamientoComponent,
    ListarUsuarioHorarioEstacionamientoComponent,
    BuscarHorarioEstacionamientoComponent,

    //Reserva Estacionamiento
    ReservaEstacionamientoComponent,
    CreaeditaReservaEstacionamientoComponent,
    ListarAdminReservaEstacionamientoComponent,
    ListarUsuarioReservaEstacionamientoComponent,

    //Pago
    PagoComponent,
    CreaeditaPagoComponent,
    ListarAdminPagoComponent,
    ListarUsuarioPagoComponent,
    BuscarPagoComponent,

    //Incidente
    IncidenteComponent,
    ListarUsuarioIncidenteComponent,
    ListarAdminIncidenteComponent,
    CreaeditaIncidenteComponent,
    BuscarIncidenteComponent,

    //Estacionamiento
    EstacionamientoComponent,
    ListarUsuarioEstacionamientoComponent,
    ListarAdminEstacionamientoComponent,
    CreaeditaEstacionamientoComponent,
    BuscarEstacionamientoComponent,
    BuscarReservaEstacionamientoComponent,
    CantPrecioTotalPorMesComponent,
    DetalleEstacionamientoComponent,
    ProfileComponent,
    ModificarUsuarioComponent,
    ListaMapaEstacionamientoComponent,
    CreaeditaRolAdminComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    RouterModule,
    NgxMaterialTimepickerModule,
    ColorSketchModule,
    ColorMaterialModule,
    MatDialogModule,
    NgChartsModule,
    MatStepperModule,
    MatTabsModule,
  ],
})
export class ComponentsModule {}
