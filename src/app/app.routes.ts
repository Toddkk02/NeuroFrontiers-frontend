import { Routes } from '@angular/router';
import { Explore } from './pages/explore/explore';
import { SubmitExperienceComponent } from './submit-experience/submit-experience';

export const routes: Routes = [
  { path: 'home', component: Explore },
  { path: 'submit', component: SubmitExperienceComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

