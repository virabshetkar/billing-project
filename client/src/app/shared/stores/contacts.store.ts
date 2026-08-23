import { signalStore, withComputed, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ContactsApi } from '../../pages/contacts/services/contacts.api.js';

export const ContactsStore = signalStore(
  withState({
    selectedContactId: null,
  }),
  withProps(() => ({
    contactsApi: inject(ContactsApi),
  })),
  withComputed(({ contactsApi }) => {
    return {
      contacts: contactsApi.contacts.value,
    };
  }),
);
