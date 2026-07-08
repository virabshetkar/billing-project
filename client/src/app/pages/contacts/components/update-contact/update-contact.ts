import { httpResource } from '@angular/common/http';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { email, form, FormField, pattern, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactsApi } from '../../services/contacts.api';

interface UpdateContactForm {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-update-contact',
  imports: [FormField],
  templateUrl: './update-contact.html',
  styleUrl: './update-contact.css',
})
export class UpdateContact {
  readonly #route = inject(ActivatedRoute);
  readonly #contactApi = inject(ContactsApi);
  readonly #router = inject(Router);

  id = toSignal(this.#route.params.pipe(map((params) => params['contactId'])));
  contact = httpResource<Contact>(() => `http://localhost:5085/api/contacts/${this.id()}`);

  contactModel = signal<UpdateContactForm>({
    name: '',
    email: '',
    phone: '',
  });

  contactForm = form(this.contactModel, (schema) => {
    required(schema.name, { message: 'Name is required' });
    required(schema.phone, { message: 'Phone is required' });
    pattern(schema.phone, /^\d{10}$/, { message: 'Phone is invalid' });
    email(schema.email, { message: 'Email is invalid' });
  });

  eff = effect(() => {
    const contact = this.contact.value();

    if (!contact) return;

    this.contactModel.set({
      ...contact,
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.contactForm().invalid()) return;
    this.#contactApi.update(this.id(), this.contactModel()).subscribe({
      next: () => {
        this.#contactApi.contacts.reload();
        this.contact.reload();
      },
    });
  }

  onDelete() {
    this.#contactApi.delete(this.id()).subscribe({
      next: () => {
        this.#contactApi.contacts.reload();
        this.#router.navigate(['/contacts']);
      },
    });
  }

  unchanged = computed(() => {
    const contact1 = this.contact.value();
    const contact2 = this.contactModel();
    if (!contact1) return false;

    return (
      contact1.name === contact2.name &&
      contact1.email === contact2.email &&
      contact1.phone === contact2.phone
    );
  });
}
