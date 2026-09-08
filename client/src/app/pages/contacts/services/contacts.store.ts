import { httpResource } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withProps, withMethods, patchState } from '@ngrx/signals';
import { Observable, of, tap } from 'rxjs';
import { Contact } from '../models/contact';
import { ContactsApi, CreateContactDto, UpdateContactDto } from './contacts.api';

export interface ContactsStoreState {
  selectedContactId: string | null;
  contactList: Contact[];
  skip: number;
  limit: number;
  hasNext: boolean;
  isLoading: boolean;
  lastUpdatedContactId: string | null;
}

export const ContactsStore = signalStore(
  withState<ContactsStoreState>({
    selectedContactId: null,
    contactList: [],
    skip: 0,
    limit: 30,
    hasNext: true,
    isLoading: false,
    lastUpdatedContactId: null,
  }),

  withProps(({ selectedContactId, lastUpdatedContactId, contactList }) => ({
    selectedContact: httpResource<Contact>(() =>
      selectedContactId() ? `/api/contacts/${selectedContactId()}` : undefined,
    ),
    lastUpdatedContact: computed(() => contactList().find((c) => c.id === lastUpdatedContactId())),
  })),

  withMethods((store, contactsApi = inject(ContactsApi)) => ({
    selectContact(id: string) {
      patchState(store, (state) => ({ ...state, selectedContactId: id }));
    },

    clearSelectedContact() {
      patchState(store, (state) => ({ ...state, selectedContactId: null }));
    },

    create(contact: CreateContactDto) {
      return contactsApi.createContact(contact).pipe(
        tap((contact) => {
          patchState(store, (state) => ({
            ...state,
            contactList: [contact, ...state.contactList].sort((a, b) =>
              a.name.localeCompare(b.name),
            ),
          }));
        }),
      );
    },

    update(id: string, contact: UpdateContactDto) {
      return contactsApi.updateContact(id, contact).pipe(
        tap((c) => {
          const newContactListState = store.contactList();

          const index = newContactListState.findIndex((con) => con.id === c.id);
          if (index !== -1) newContactListState.splice(index, 1);

          patchState(store, (state) => ({
            ...state,
            contactList: [c, ...newContactListState].sort((a, b) => a.name.localeCompare(b.name)),
            lastUpdatedContactId: c.id,
          }));

          store.selectedContact?.reload();
        }),
      );
    },

    delete(id: string) {
      return contactsApi.deleteContact(id).pipe(
        tap((c) => {
          const newContactList = store.contactList();
          const index = newContactList.findIndex((con) => con.id === c.id);
          if (index !== -1) newContactList.splice(index, 1);

          patchState(store, (state) => ({
            ...state,
            selectedContactId: undefined,
            contactList: newContactList,
          }));
        }),
      );
    },

    loadNext(): Observable<Contact[] | null> {
      const skip = store.contactList().length;

      if (!store.hasNext() || store.isLoading()) return of(null);

      patchState(store, (state) => ({ ...state, isLoading: true }));

      return contactsApi.getContacts(store.limit(), skip).pipe(
        tap((c) => {
          patchState(store, (state) => ({
            ...state,
            contactList: [...state.contactList, ...c],
            isLoading: false,
            hasNext: store.limit() === c.length,
          }));
        }),
      );
    },

    reset() {
      patchState(store, (state) => ({
        ...state,
        contactList: [],
      }));
    },
  })),
);
