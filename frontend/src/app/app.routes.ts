import { Routes } from '@angular/router';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AccountsNewComponent } from './components/pages/accounts/accounts-new/accounts-new.component';
import { BankNewComponent } from './components/pages/bank/bank-new/bank-new.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'accounts/add-account',
    component: AccountsNewComponent,
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('./components/pages/accounts/accounts/accounts.component').then(
        (m) => m.AccountsComponent
      ),
  },
  {
    path: 'config/add-bank',
    component: BankNewComponent,
  },
];
