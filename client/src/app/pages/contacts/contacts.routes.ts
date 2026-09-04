import { Routes } from '@angular/router';
import { ContactsStore } from './services/contacts.store';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./contacts.page').then((c) => c.ContactsPage),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./components/contacts-home/contacts-home').then((c) => c.ContactsHome),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./components/create-contact/create-contact').then((c) => c.CreateContact),
      },
      {
        path: ':contactId',
        loadComponent: () =>
          import('./components/view-contact/view-contact').then((c) => c.ViewContact),
      },
      {
        path: ':contactId/edit',
        loadComponent: () =>
          import('./components/update-contact/update-contact').then((c) => c.UpdateContact),
      },
    ],
    providers: [ContactsStore],
  },
];
