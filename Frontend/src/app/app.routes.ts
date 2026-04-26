import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('./pages/catalog/catalog.page').then(m => m.CatalogPage),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.page').then(m => m.CartPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then(m => m.ProfilePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'order-list',
    loadComponent: () => import('./pages/order-list/order-list.page').then( m => m.OrderListPage)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product/product.page').then( m => m.ProductPage)
  }

  

];