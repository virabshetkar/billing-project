import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Contact } from '../models/contact';

@Service()
export class ContactsApi {
  readonly #http = inject(HttpClient);

  contacts = httpResource<Contact[]>(() => 'http://localhost:5085/api/contacts');

  create(contact: { name: string; email: string; phone: string }) {
    return this.#http.post<Contact>('http://localhost:5085/api/contacts', contact);
  }

  update(id: string, contact: { name: string; email: string; phone: string }) {
    return this.#http.put<Contact>(`http://localhost:5085/api/contacts/${id}`, contact);
  }

  delete(id: string) {
    return this.#http.delete<Contact>(`http://localhost:5085/api/contacts/${id}`);
  }
}
