import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  faEnvelope,
  faPhone,
  faTrash,
  faPen,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Loading } from '../../../../shared/components/loading/loading';
import { ContactsStore } from '../../services/contacts.store';

@Component({
  selector: 'app-view-contact',
  imports: [FaIconComponent, RouterLink, CdkMenuModule, Loading],
  templateUrl: './view-contact.html',
  styleUrl: './view-contact.css',
})
export class ViewContact implements OnInit, OnDestroy {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  private contactsStore = inject(ContactsStore);

  readonly selectedContact = this.contactsStore.selectedContact;

  readonly icons = {
    faEnvelope,
    faPhone,
    faTrash,
    faPen,
    faEllipsisV,
  } as const;

  readonly id = toSignal(this.#route.params.pipe(map((params) => params['contactId'])));

  effs = [
    effect(() => {
      this.contactsStore.selectContact(this.id());
    }),
  ];

  ngOnInit(): void {
    this.contactsStore.selectContact(this.id());
  }

  ngOnDestroy(): void {
    this.contactsStore.clearSelectedContact();
  }

  onDelete() {
    this.contactsStore.delete(this.id()).subscribe({
      next: () => {
        this.#router.navigate(['/contacts']);
      },
    });
  }
}
