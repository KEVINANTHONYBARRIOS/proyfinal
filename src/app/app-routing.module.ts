import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { authGuard } from './guard/auth.guard';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';
import { adminGuardGuard } from './guard/admin-guard.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'bienvenida',
    component: BienvenidaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
