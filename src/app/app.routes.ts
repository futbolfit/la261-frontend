import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/main-landing/main-landing.component'),
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
