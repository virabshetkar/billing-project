import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.routes').then((c) => c.routes),
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.routes').then((c) => c.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contacts',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/notfound/notfound.page').then((c) => c.NotfoundPage),
  },
];
