import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Contact } from '../models/contact';

@Service()
export class ContactsApi {
  readonly #http = inject(HttpClient);
  readonly #selectedContactId = signal<string | null>(null);

  selectedContact = httpResource<Contact>(() =>
    this.#selectedContactId() !== null ? `/api/contacts/${this.#selectedContactId()}` : undefined,
  );

  contacts = httpResource<Contact[]>(() => '/api/contacts');

  selectContact(id: string) {
    this.#selectedContactId.set(id);
  }

  clearSelectedContact() {
    this.#selectedContactId.set(null);
  }

  create(contact: { name: string; email: string; phone: string }) {
    return this.#http.post<Contact>('/api/contacts', contact);
  }

  update(id: string, contact: { name: string; email: string; phone: string }) {
    return this.#http.put<Contact>(`/api/contacts/${id}`, contact);
  }

  delete(id: string) {
    return this.#http.delete<Contact>(`/api/contacts/${id}`);
  }
}
