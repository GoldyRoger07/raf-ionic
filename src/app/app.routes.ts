import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },{
    path: 'folder/:id',
    loadComponent: () => import('./folder/folder.page').then( m => m.FolderPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'inscription',
    loadComponent: () => import('./inscription/inscription.page').then( m => m.InscriptionPage)
  },
  {
    path: 'inscription/verification-email',
    loadComponent: () => import('./verification-email/verification-email.page').then( m => m.VerificationEmailPage)
  },
  {
    path: 'inscription/create-password',
    loadComponent: () => import('./create-password/create-password.page').then( m => m.CreatePasswordPage)
  }
];
