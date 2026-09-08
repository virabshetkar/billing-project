import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, pattern, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ContactsStore } from '../../services/contacts.store';

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
  private readonly router = inject(Router);
  private readonly contactsStore = inject(ContactsStore);

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
      this.contactsStore.create(this.contactModel()).subscribe({
        next: (value) => {
          this.router.navigate(['/contacts', value.id]);
        },
      });
    }
  }
}
