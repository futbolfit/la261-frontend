import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/main-landing/main-landing.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./views/contact/concact.component'),
  },
  {
    path: 'us',
    loadComponent: () => import('./views/us/us.component'),
  },
  {
    path: 'services',
    loadComponent: () => import('./views/our-services/our-services.component'),
  },
  {
    path: 'projects',
    loadComponent: () => import('./views/projects/projects.component'),
  },
  {
    path: 'projects/:project_name',
    loadComponent: () => import('./views/project/project.component'),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
