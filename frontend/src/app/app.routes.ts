import { Routes } from '@angular/router';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { LoginComponent } from './components/pages/auth/login/login.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
