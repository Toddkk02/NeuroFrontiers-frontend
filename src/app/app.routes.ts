import { Routes } from '@angular/router';
import { Explore } from './pages/explore/explore';
import { SubmitExperienceComponent } from './submit-experience/submit-experience';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'home', component: Explore },
  { path: 'submit', component: SubmitExperienceComponent },
  { path: 'login', component: Login},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

