import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, min, pattern, required } from '@angular/forms/signals';
import { ContactsApi } from '../../services/contacts.api';
import { Router } from '@angular/router';

interface CreateContactForm {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-create-contact',
  imports: [FormField],
  templateUrl: './create-contact.html',
  styleUrl: './create-contact.css',
})
export class CreateContact {
  readonly #router = inject(Router);
  readonly #contactsApi = inject(ContactsApi);

  contactModel = signal<CreateContactForm>({
    name: '',
    email: '',
    phone: '',
  });

  contactForm = form(this.contactModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    email(schemaPath.email, { message: 'Email is invalid' });
    required(schemaPath.phone, { message: 'Phone is required' });
    pattern(schemaPath.phone, /^\d{10}$/, { message: 'Phone is invalid' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.contactForm().valid()) {
      this.#contactsApi.create(this.contactModel()).subscribe({
        next: (value) => {
          this.#contactsApi.contacts.reload();
          this.#router.navigate(['/contacts', value.id]);
        },
      });
    }
  }
}
