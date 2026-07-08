import { Routes } from '@angular/router';
import { ProductsApi } from './services/products.api';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products.page').then((c) => c.ProductsPage),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./components/products-home/products-home').then((c) => c.ProductsHome),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./components/products-create/products-create').then((c) => c.ProductsCreate),
      },
      {
        path: ':productId',
        loadComponent: () =>
          import('./components/products-update/products-update').then((c) => c.ProductsUpdate),
      },
    ],
    providers: [ProductsApi],
  },
];
