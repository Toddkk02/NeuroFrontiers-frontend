import { Routes } from '@angular/router';
import { Explore } from './pages/explore/explore';
import { SubmitExperienceComponent } from './submit-experience/submit-experience';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: Explore },
  { path: 'submit', component: SubmitExperienceComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

