import { httpResource, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withProps, withMethods, patchState } from '@ngrx/signals';
import { tap } from 'rxjs';
import { Contact } from '../models/contact';

export type ContactsStoreState = {
  selectedContactId: string | null;
};

export type CreateContactDto = {
  name: string;
  email: string;
  phone: string;
};

export type UpdateContactDto = {
  name: string;
  email: string;
  phone: string;
};

export const ContactsStore = signalStore(
  withState<ContactsStoreState>({ selectedContactId: null }),
  withProps(({ selectedContactId }) => ({
    contacts: httpResource<Contact[]>(() => '/api/contacts'),
    selectedContact: httpResource<Contact>(() =>
      selectedContactId() ? `/api/contacts/${selectedContactId()}` : undefined,
    ),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    selectContact(id: string) {
      patchState(store, (state) => ({ ...state, selectedContactId: id }));
    },
    clearSelectedContact() {
      patchState(store, (state) => ({ ...state, selectedContactId: null }));
    },
    create(contact: CreateContactDto) {
      return http.post<Contact>('/api/contacts', contact).pipe(
        tap(() => {
          store.contacts.reload();
        }),
      );
    },
    update(id: string, contact: UpdateContactDto) {
      return http.put<Contact>(`/api/contacts/${id}`, contact).pipe(
        tap(() => {
          store.contacts.reload();
          store.selectedContact?.reload();
        }),
      );
    },
    delete(id: string) {
      return http.delete<Contact>(`/api/contacts/${id}`).pipe(
        tap(() => {
          store.contacts.reload();
        }),
      );
    },
  })),
);
