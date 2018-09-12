import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserResolver } from './user/user.resolver';
import { HomeResolver } from './home/home.resolver';
import { AuthGuard } from './core/auth.guard';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent,  resolve: { data: HomeResolver} },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'home', component: HomeComponent,  resolve: { data: HomeResolver}}
];
