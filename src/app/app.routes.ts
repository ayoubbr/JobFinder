import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProfileComponent } from './features/auth/profile/profile.component';
import { HomeComponent } from './shared/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { JobsResolver } from './core/services/job-resolver.service';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/home/home.component')
            .then(m => m.HomeComponent),
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component')
            .then(m => m.RegisterComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component')
            .then(m => m.LoginComponent),
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/auth/profile/profile.component')
            .then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'jobs',
        loadComponent: () => import('./features/job/job.component').then(m => m.JobComponent),
        resolve: { jobs: JobsResolver }
    },
    {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/favorites.component')
            .then(m => m.FavoritesComponent),
        canActivate: [authGuard]
    },
    {
        path: 'applications',
        loadComponent: () => import('./features/application/application.component')
            .then(m => m.ApplicationComponent),
        canActivate: [authGuard]
    }
];
