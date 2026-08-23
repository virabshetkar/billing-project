import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ContactsApi } from '../../services/contacts.api';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  faEdit,
  faEnvelope,
  faPhone,
  faPlus,
  faTrash,
  faUser,
  faPencil,
  faPencilAlt,
  faPen,
  faPenAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-view-contact',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './view-contact.html',
  styleUrl: './view-contact.css',
})
export class ViewContact implements OnInit, OnDestroy {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #contactsApi = inject(ContactsApi);

  readonly icons = {
    faEnvelope,
    faPhone,
    faUser,
    faEdit,
    faTrash,
    faPlus,
    faPencil,
    faPencilAlt,
    faPen,
    faPenAlt,
  } as const;

  selectedContact = this.#contactsApi.selectedContact;
  id = toSignal(this.#route.params.pipe(map((params) => params['contactId'])));

  eff = effect(() => {
    this.#contactsApi.selectContact(this.id());
  });

  ngOnInit(): void {
    this.#contactsApi.selectContact(this.id());
  }

  ngOnDestroy(): void {
    this.#contactsApi.clearSelectedContact();
  }

  onDelete() {
    this.#contactsApi.delete(this.id()).subscribe({
      next: () => {
        this.#contactsApi.contacts.reload();
        this.#router.navigate(['/contacts']);
      },
    });
  }
}
