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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

import { CreaeditaUsuarioComponent } from './components/usuarios/creaedita-usuario/creaedita-usuario.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'; //Necesario en el CMD ->   npm install  --save ngx-material-timepicker
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
import { BuscarHorarioComponent } from './components/horario/buscar-horario/buscar-horario.component';
import { BuscarHorarioEstacionamientoComponent } from './components/horario-estacionamiento/buscar-horario-estacionamiento/buscar-horario-estacionamiento.component';
import { ListarAdminMembresiaComponent } from './components/membresia/listar-admin-membresia/listar-admin-membresia.component';
import { BuscarIncidenteComponent } from './components/incidente/buscar-incidente/buscar-incidente.component';
import { EstacionamientoComponent } from './components/estacionamiento/estacionamiento.component';
import { ListarUsuarioEstacionamientoComponent } from './components/estacionamiento/listar-usuario-estacionamiento/listar-usuario-estacionamiento.component';
import { ListarAdminEstacionamientoComponent } from './components/estacionamiento/listar-admin-estacionamiento/listar-admin-estacionamiento.component';
import { CreaeditaEstacionamientoComponent } from './components/estacionamiento/creaedita-estacionamiento/creaedita-estacionamiento.component';
import { BuscarEstacionamientoComponent } from './components/estacionamiento/buscar-estacionamiento/buscar-estacionamiento.component';
import { BuscarReservaEstacionamientoComponent } from './components/reserva-estacionamiento/buscar-reserva-estacionamiento/buscar-reserva-estacionamiento.component';
import { BuscarUsuariosComponent } from './components/usuarios/buscar-usuarios/buscar-usuarios.component';
import { BuscarComentariosComponent } from './components/comentario/buscar-comentarios/buscar-comentarios.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    //Nav Bars
    NavbarComponent,
    //Sign UP & Sign IN
    SignUpComponent,
    SignInComponent,

    //Homes
    HomeComponent,

    //Footer
    FooterComponent,
    //Membresia
    ListarUsuarioMembresiaComponent,

    //Rol
    CreaeditaRolComponent,

    //Usuarios
    CreaeditaUsuarioComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
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
    HttpClientModule,
    RouterModule,
    NgxMaterialTimepickerModule,
    ColorSketchModule,
    ColorMaterialModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
