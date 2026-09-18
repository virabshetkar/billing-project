import { httpResource } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withProps, withMethods, patchState } from '@ngrx/signals';
import { map, Observable, of, switchMap, tap } from 'rxjs';
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

type InsertionResult = { type: 'insert'; index: number } | { type: 'already-loaded' };

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

  withMethods((store, contactsApi = inject(ContactsApi)) => {
    const compareContacts = (a: Contact, b: Contact) => a.name.localeCompare(b.name);

    const findInsertionIndex = (contacts: Contact[], contact: Contact, left = 0): number => {
      let right = contacts.length;

      while (left < right) {
        const mid = left + Math.floor((right - left) / 2);

        if (compareContacts(contacts[mid], contact) < 0) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      return left;
    };

    const findInsertionPoint = (contact: Contact, left = 0): Observable<InsertionResult> => {
      const contacts = store.contactList();

      // The server has already returned this contact.
      if (contacts.some((c) => c.id === contact.id)) {
        return of({ type: 'already-loaded' });
      }

      const index = findInsertionIndex(contacts, contact, left);

      // We have a loaded contact after the new contact.
      if (index < contacts.length) {
        return of({
          type: 'insert',
          index,
        });
      }

      // We've reached the end of the entire dataset.
      if (!store.hasNext()) {
        return of({
          type: 'insert',
          index,
        });
      }

      const nextLeft = contacts.length;

      return loadNext().pipe(switchMap(() => findInsertionPoint(contact, nextLeft)));
    };

    const insertAt = (contact: Contact, index: number) => {
      patchState(store, (state) => ({
        ...state,
        contactList: [
          ...state.contactList.slice(0, index),
          contact,
          ...state.contactList.slice(index),
        ],
      }));
    };

    const loadNext = (): Observable<Contact[] | null> => {
      const skip = store.contactList().length;

      if (!store.hasNext() || store.isLoading()) {
        return of(null);
      }

      patchState(store, (state) => ({
        ...state,
        isLoading: true,
      }));

      return contactsApi.getContacts(store.limit(), skip).pipe(
        tap((contacts) => {
          patchState(store, (state) => ({
            ...state,
            contactList: [...state.contactList, ...contacts],
            isLoading: false,
            hasNext: store.limit() === contacts.length,
          }));
        }),
      );
    };

    return {
      selectContact(id: string) {
        patchState(store, (state) => ({
          ...state,
          selectedContactId: id,
        }));
      },

      clearSelectedContact() {
        patchState(store, (state) => ({
          ...state,
          selectedContactId: null,
        }));
      },

      create(contact: CreateContactDto): Observable<Contact> {
        return contactsApi.createContact(contact).pipe(
          switchMap((createdContact) =>
            findInsertionPoint(createdContact).pipe(
              tap((result) => {
                if (result.type === 'insert') {
                  insertAt(createdContact, result.index);
                }
                patchState(store, (state) => ({
                  ...state,
                  lastUpdatedContactId: createdContact.id,
                }));
              }),
              map(() => createdContact),
            ),
          ),
        );
      },

      update(id: string, contact: UpdateContactDto): Observable<Contact> {
        return contactsApi.updateContact(id, contact).pipe(
          switchMap((updatedContact) => {
            patchState(store, (state) => ({
              ...state,
              contactList: state.contactList.filter((c) => c.id !== updatedContact.id),
            }));

            return findInsertionPoint(updatedContact).pipe(
              tap((result) => {
                if (result.type === 'insert') {
                  insertAt(updatedContact, result.index);
                }

                patchState(store, (state) => ({
                  ...state,
                  lastUpdatedContactId: updatedContact.id,
                }));

                store.selectedContact?.reload();
              }),
              map(() => updatedContact),
            );
          }),
        );
      },

      delete(id: string) {
        return contactsApi.deleteContact(id).pipe(
          tap((c) => {
            patchState(store, (state) => ({
              ...state,
              selectedContactId: null,
              contactList: state.contactList.filter((con) => con.id !== c.id),
            }));
          }),
        );
      },

      loadNext,

      reset() {
        patchState(store, (state) => ({
          ...state,
          contactList: [],
        }));
      },
    };
  }),
);
