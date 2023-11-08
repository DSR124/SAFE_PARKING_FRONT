import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeAdministradorComponent } from './components/home-administrador/home-administrador.component';
import { HomeConductorComponent } from './components/home-conductor/home-conductor.component';
import { HomeArrendadorComponent } from './components/home-arrendador/home-arrendador.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'SigUp',
    component: SignUpComponent,
  },
  {
    path: 'components',
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
