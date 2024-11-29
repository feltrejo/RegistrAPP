import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from '../app/canactivate.guard';
import { CanmatchGuard } from '../app/canmatch.guard';
import { CanDeactivateGuard } from '../app/candeactivate.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canMatch: [CanmatchGuard],
    canActivate: [canActivate],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule),
    canDeactivate: [CanDeactivateGuard]
  },
  {
path: 'dashboard',
loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
canActivate: [canActivate],
canMatch: [CanmatchGuard],
canDeactivate: [CanDeactivateGuard]
},
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
