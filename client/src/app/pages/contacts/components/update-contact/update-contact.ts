import { httpResource } from '@angular/common/http';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { email, form, FormField, pattern, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactsStore } from '../../services/contacts.store';
import { SidebarPortal } from '../../../../shared/services/sidebar-portal';

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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly contactsStore = inject(ContactsStore);
  private readonly sidebar = inject(SidebarPortal);

  private readonly id = toSignal(this.route.params.pipe(map((params) => params['contactId'])));

  private readonly contactModel = signal<UpdateContactForm>({
    name: '',
    email: '',
    phone: '',
  });

  protected readonly contact = httpResource<Contact>(() => `/api/contacts/${this.id()}`);

  protected readonly contactForm = form(this.contactModel, (schema) => {
    required(schema.name, { message: 'Name is required' });
    required(schema.phone, { message: 'Phone is required' });
    pattern(schema.phone, /^\d{10}$/, { message: 'Phone is invalid' });
    email(schema.email, { message: 'Email is invalid' });
  });

  constructor() {
    effect(() => {
      const contact = this.contact.value();

      if (!contact) return;

      this.contactModel.set({
        ...contact,
      });
    });
  }

  protected onSubmit(event: Event) {
    event.preventDefault();

    if (this.contactForm().invalid()) return;

    this.contactsStore.update(this.id(), this.contactModel()).subscribe({
      next: () => {
        this.router.navigate(['/contacts', this.id()]);
      },
    });
  }

  protected onDelete() {
    this.contactsStore.delete(this.id()).subscribe({
      next: () => {
        this.router.navigate(['/contacts']);
      },
    });
  }

  protected readonly unchanged = computed(() => {
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
