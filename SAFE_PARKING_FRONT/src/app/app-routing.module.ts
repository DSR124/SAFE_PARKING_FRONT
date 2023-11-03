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
import { HorarioComponent } from './components/horario/horario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolComponent } from './components/rol/rol.component';
import { listarAdminUsuarioComponent } from './components/usuarios/listar-admin-usuario/listar-admin-usuario.component';
import { CreaeditaRolComponent } from './components/rol/creaedita-rol/creaedita-rol.component';
import { ListarAdminVehiculosComponent } from './components/vehiculos/listar-admin-vehiculos/listar-admin-vehiculos.component';
import { ListarUsuarioMembresiaComponent } from './components/membresia/listar-usuario-membresia/listar-usuario-membresia.component';
import { ListarusuarioLocalizacionesComponent } from './components/localizaciones/listar-usuario-localizaciones/listar-usuario-localizaciones.component';
import { ListarAdminLocalizacionesComponent } from './components/localizaciones/listar-admin-localizaciones/listar-admin-localizaciones.component';
import { ListarUsuarioHorarioComponent } from './components/horario/listar-usuario-horario/listar-usuario-usuario-horario.component';
import { ListarAdminHorarioComponent } from './components/horario/listar-admin-horario/listar-admin-horario.component';

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
        path: 'modificar_localizaciones/ediciones/:type',
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
    ],
  },

  // membresias
  {
    path: 'membresia',
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
        path: 'listar_admin_horarios',
        component: ListarAdminHorarioComponent,
      },
      {
        path: 'modificar_horarios/ediciones/:id',
        component: CreaeditaHorarioComponent,
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
    children: [{ path: 'registrar_roles', component: CreaeditaRolComponent }],
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
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
