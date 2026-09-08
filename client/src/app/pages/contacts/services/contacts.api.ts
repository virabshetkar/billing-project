import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Contact } from '../models/contact';

export interface CreateContactDto {
  name: string;
  phone: string;
  email: string;
}

export interface UpdateContactDto {
  name: string;
  phone: string;
  email: string;
}

@Service()
export class ContactsApi {
  private readonly http = inject(HttpClient);

  getContacts(limit = 30, skip = 0) {
    return this.http.get<Contact[]>('/api/contacts', {
      params: {
        skip,
        limit,
      },
    });
  }

  getContact(id: string) {
    return this.http.get<Contact>(`/api/contacts/${id}`);
  }

  createContact(contact: CreateContactDto) {
    return this.http.post<Contact>('/api/contacts', contact);
  }

  updateContact(id: string, contact: CreateContactDto) {
    return this.http.put<Contact>(`/api/contacts/${id}`, contact);
  }

  deleteContact(id: string) {
    return this.http.delete<Contact>(`/api/contacts/${id}`);
  }
}
