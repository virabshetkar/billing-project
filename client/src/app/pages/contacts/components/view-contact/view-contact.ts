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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly contactsStore = inject(ContactsStore);

  protected readonly selectedContact = this.contactsStore.selectedContact;

  protected readonly icons = {
    faEnvelope,
    faPhone,
    faTrash,
    faPen,
    faEllipsisV,
  } as const;

  protected readonly id = toSignal(this.route.params.pipe(map((params) => params['contactId'])));

  constructor() {
    effect(() => {
      this.contactsStore.selectContact(this.id());
    });
  }

  ngOnInit(): void {
    this.contactsStore.selectContact(this.id());
  }

  ngOnDestroy(): void {
    this.contactsStore.clearSelectedContact();
  }

  protected onDelete() {
    this.contactsStore.delete(this.id()).subscribe({
      next: () => {
        this.router.navigate(['/contacts']);
      },
    });
  }
}
