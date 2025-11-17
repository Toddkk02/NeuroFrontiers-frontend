import { Routes } from '@angular/router';
import { Explore } from './pages/explore/explore';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { SubmitExperienceComponent } from './submit-experience/submit-experience';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { SubstancesComponent } from './pages/substances/substances.component';
import { SubstanceDetailComponent } from './pages/substance-detail/substance-detail.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: Explore },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'submit', component: SubmitExperienceComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'substances', component: SubstancesComponent },
  { path: 'substance/:id', component: SubstanceDetailComponent },
  { path: 'harm-reduction', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
