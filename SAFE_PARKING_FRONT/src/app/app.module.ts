import { ListarusuarioLocalizacionesComponent } from './components/localizaciones/listar-usuario-localizaciones/listar-usuario-localizaciones.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
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
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatCardModule } from '@angular/material/card';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { LoginService } from './services/login.service';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { HomeConductorComponent } from './components/home-conductor/home-conductor.component';
import { HomeArrendadorComponent } from './components/home-arrendador/home-arrendador.component';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreaeditaVehiculosComponent } from './components/vehiculos/creaedita-vehiculos/creaedita-vehiculos.component';
import { BuscarVehiculosComponent } from './components/vehiculos/buscar-vehiculos/buscar-vehiculos.component';
import { LocalizacionesComponent } from './components/localizaciones/localizaciones.component';
import { CreaeditaLocalizacionesComponent } from './components/localizaciones/creaedita-localizaciones/creaedita-localizaciones.component';
import { BuscarLocalizacionesComponent } from './components/localizaciones/buscar-localizaciones/buscar-localizaciones.component';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { CreaeditaMembresiaComponent } from './components/membresia/creaedita-membresia/creaedita-membresia.component';
import { BuscarMembresiaComponent } from './components/membresia/buscar-membresia/buscar-membresia.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditaUsuarioComponent } from './components/usuarios/creaedita-usuario/creaedita-usuario.component';
import { AppRoutingModule } from './app-routing.module';
import { HorarioComponent } from './components/horario/horario.component';
import { CreaeditaHorarioComponent } from './components/horario/creaedita-horario/creaedita-horario.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'; //Necesario en el CMD ->   npm install  --save ngx-material-timepicker
import { HomeAdministradorComponent } from './components/home-administrador/home-administrador.component';
import { NavbarAdministradorComponent } from './components/navbar-administrador/navbar-administrador.component';
import { NavbarArrendadorComponent } from './components/navbar-arrendador/navbar-arrendador.component';
import { NavbarConductorComponent } from './components/navbar-conductor/navbar-conductor.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CantReservasPorFechaComponent } from './components/reportes/cant-reservas-por-fecha/cant-reservas-por-fecha.component';
import { CantReservasPorTipoPagoComponent } from './components/reportes/cant-reservas-por-tipo-pago/cant-reservas-por-tipo-pago.component';
import { CantReservasPorUsuarioComponent } from './components/reportes/cant-reservas-por-usuario/cant-reservas-por-usuario.component';
import { CantIncidentesPorRolComponent } from './components/reportes/cant-incidentes-por-rol/cant-incidentes-por-rol.component';
import { ListarAdminVehiculosComponent } from './components/vehiculos/listar-admin-vehiculos/listar-admin-vehiculos.component';
import { ListarAdminLocalizacionesComponent } from './components/localizaciones/listar-admin-localizaciones/listar-admin-localizaciones.component';
import { ListarUsuarioMembresiaComponent } from './components/membresia/listar-usuario-membresia/listar-usuario-membresia.component';
import { listarAdminUsuarioComponent } from './components/usuarios/listar-admin-usuario/listar-admin-usuario.component';
import { ListarUsuarioHorarioComponent } from './components/horario/listar-usuario-horario/listar-usuario-usuario-horario.component';
import { ListarAdminHorarioComponent } from './components/horario/listar-admin-horario/listar-admin-horario.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorMaterialModule } from 'ngx-color/material';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { CreaeditaComentarioComponent } from './components/comentario/creaedita-comentario/creaedita-comentario.component';
import { ListarAdminComentarioComponent } from './components/comentario/listar-admin-comentario/listar-admin-comentario.component';
import { ListarUsuarioComentarioComponent } from './components/comentario/listar-usuario-comentario/listar-usuario-comentario.component';
import { ListarUsuarioEstacionamientoComponent } from './components/estacionamiento/listar-usuario-estacionamiento/listar-usuario-estacionamiento.component';
import { EstacionamientoComponent } from './components/estacionamiento/estacionamiento.component';
import { ListarAdminEstacionamientoComponent } from './components/estacionamiento/listar-admin-estacionamiento/listar-admin-estacionamiento.component';
import { CreaeditaEstacionamientoComponent } from './components/estacionamiento/creaedita-estacionamiento/creaedita-estacionamiento.component';
import { HorarioEstacionamientoComponent } from './components/horario-estacionamiento/horario-estacionamiento.component';
import { ReservaEstacionamientoComponent } from './components/reserva-estacionamiento/reserva-estacionamiento.component';
import { CreaeditaReservaEstacionamientoComponent } from './components/reserva-estacionamiento/creaedita-reserva-estacionamiento/creaedita-reserva-estacionamiento.component';
import { ListarAdminReservaEstacionamientoComponent } from './components/reserva-estacionamiento/listar-admin-reserva-estacionamiento/listar-admin-reserva-estacionamiento.component';
import { ListarUsuarioReservaEstacionamientoComponent } from './components/reserva-estacionamiento/listar-usuario-reserva-estacionamiento/listar-usuario-reserva-estacionamiento.component';
import { PagoComponent } from './components/pago/pago.component';
import { CreaeditaPagoComponent } from './components/pago/creaedita-pago/creaedita-pago.component';
import { ListarAdminPagoComponent } from './components/pago/listar-admin-pago/listar-admin-pago.component';
import { ListarUsuarioPagoComponent } from './components/pago/listar-usuario-pago/listar-usuario-pago.component';
import { IncidenteComponent } from './components/incidente/incidente.component';
import { ListarUsuarioIncidenteComponent } from './components/incidente/listar-usuario-incidente/listar-usuario-incidente.component';
import { ListarAdminIncidenteComponent } from './components/incidente/listar-admin-incidente/listar-admin-incidente.component';
import { CreaeditaIncidenteComponent } from './components/incidente/creaedita-incidente/creaedita-incidente.component';
import { CreaeditaHorarioEstacionamientoComponent } from './components/horario-estacionamiento/creaedita-horario-estacionamiento/creaedita-horario-estacionamiento.component';
import { ListarAdminHorarioEstacionamientoComponent } from './components/horario-estacionamiento/listar-admin-horario-estacionamiento/listar-admin-horario-estacionamiento.component';
import { ListarUsuarioHorarioEstacionamientoComponent } from './components/horario-estacionamiento/listar-usuario-horario-estacionamiento/listar-usuario-horario-estacionamiento.component';
import { CreaeditaRolComponent } from './components/rol/creaedita-rol/creaedita-rol.component';
import { RolComponent } from './components/rol/rol.component';
import { ListarAdminRolComponent } from './components/rol/listar-admin-rol/listar-admin-rol.component';
import { BuscarPagoComponent } from './components/pago/buscar-pago/buscar-pago.component';
import { BuscarRolComponent } from './components/rol/buscar-rol/buscar-rol.component';

@NgModule({
  declarations: [
    AppComponent,
    //Nav Bars
    NavbarComponent,
    NavbarAdministradorComponent,
    NavbarArrendadorComponent,
    NavbarConductorComponent,

    //Sign UP & Sign IN
    SignUpComponent,
    SignInComponent,

    //Homes
    HomeConductorComponent,
    HomeAdministradorComponent,
    HomeArrendadorComponent,
    HomeComponent,

    //Footer
    FooterComponent,

    //Horario
    HorarioComponent,
    CreaeditaHorarioComponent,
    ListarUsuarioHorarioComponent,
    ListarAdminHorarioComponent,

    //Localizaciones
    LocalizacionesComponent,
    BuscarLocalizacionesComponent,
    CreaeditaLocalizacionesComponent,
    ListarAdminLocalizacionesComponent,
    ListarusuarioLocalizacionesComponent,

    //Membresia
    BuscarMembresiaComponent,
    MembresiaComponent,
    CreaeditaMembresiaComponent,
    ListarUsuarioMembresiaComponent,

    //Rol
    RolComponent,
    CreaeditaRolComponent,

    //Usuarios

    UsuariosComponent,
    CreaeditaUsuarioComponent,
    listarAdminUsuarioComponent,

    //Vehiculos
    VehiculosComponent,
    BuscarVehiculosComponent,
    CreaeditaVehiculosComponent,
    ListarAdminVehiculosComponent,

    //Reportes
    ReportesComponent,
    CantReservasPorFechaComponent,
    CantReservasPorTipoPagoComponent,
    CantReservasPorUsuarioComponent,
    CantIncidentesPorRolComponent,

    //Comentario
    ComentarioComponent,
    CreaeditaComentarioComponent,
    ListarAdminComentarioComponent,
    ListarUsuarioComentarioComponent,

    //Estacionamiento
    ListarUsuarioEstacionamientoComponent,
    EstacionamientoComponent,
    ListarAdminEstacionamientoComponent,
    CreaeditaEstacionamientoComponent,

    //Horario-Estacionamiento
    HorarioEstacionamientoComponent,
    CreaeditaHorarioEstacionamientoComponent,
    ListarAdminHorarioEstacionamientoComponent,
    ListarUsuarioHorarioEstacionamientoComponent,

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

    //Incidente
    IncidenteComponent,
    ListarUsuarioIncidenteComponent,
    ListarAdminIncidenteComponent,
    CreaeditaIncidenteComponent,
    ListarAdminRolComponent,
    BuscarPagoComponent,
    BuscarRolComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    CommonModule,
    JwtModule,
    HttpClientModule,
    RouterModule,
    NgxMaterialTimepickerModule,
    ColorSketchModule,
    ColorMaterialModule,
    
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
