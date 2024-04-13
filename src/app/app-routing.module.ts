import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'decorations',
    loadChildren: () =>
      import('./components/decorations/decorations.module').then(
        (m) => m.DecorationsModule
      ),
  },
  {
    path: 'best-selling',
    loadChildren: () =>
      import('./components/best-selling/best-selling.module').then(
        (m) => m.BestSellingModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./components/cart/cart.module').then((m) => m.CartModule),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () =>
      import('./components/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
