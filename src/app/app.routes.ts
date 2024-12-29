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
  },
  {
    path: 'accueil',
    loadComponent: () => import('./home/accueil/accueil.page').then( m => m.AccueilPage)
  },
  {
    path: 'accueil/quiz',
    loadComponent: () => import('./home/quiz/quiz.page').then( m => m.QuizPage)
  },
  {
    path: 'partie',
    loadComponent: () => import('./home/partie/partie.page').then( m => m.PartiePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./home/compte-profile/compte-profile.page').then( m => m.CompteProfilePage)
  },
  {
    path: 'modifier/compte',
    loadComponent: () => import('./home/update-infos/update-infos.page').then( m => m.UpdateInfosPage)
  },
  {
    path: 'modifier/password',
    loadComponent: () => import('./home/update-password/update-password.page').then( m => m.UpdatePasswordPage)
  },
  {
    path: 'transactions/depot',
    loadComponent: () => import('./home/depot/depot.page').then( m => m.DepotPage)
  },
  {
    path: 'transactions/retrait',
    loadComponent: () => import('./home/retrait/retrait.page').then( m => m.RetraitPage)
  }
];
