import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarInterface, SidebarPortal } from '../../../../shared/services/sidebar-portal';
import { ContactsStore } from '../../services/contacts.store';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements SidebarInterface {
  private readonly injector = inject(Injector);
  protected readonly sidebarPortal = inject(SidebarPortal);
  protected readonly contactsStore = inject(ContactsStore);

  private readonly sentinel = viewChild('sentinel', { read: ElementRef });
  private readonly contactList = viewChild('contactList', { read: ElementRef });

  protected readonly selectedContact = this.contactsStore.selectedContact;
  protected readonly scroller = inject(ViewportScroller);
  protected readonly items: { name: string; id: string }[] = [];

  constructor() {
    effect((cleanup) => {
      const s = this.sentinel();

      if (!s) {
        return;
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.loadNext()?.subscribe();
        }
      });

      observer.observe(s.nativeElement);

      cleanup(() => observer.disconnect());
    });

    const initialScrollToContact = effect(() => {
      if (this.contactsStore.isLoading()) return;

      const el = this.contactList()?.nativeElement as HTMLDivElement;
      if (!el) return;

      const id = this.contactsStore.selectedContactId();
      if (!id) return;

      if (this.contactsStore.contactList().find((c) => c.id === id)) {
        this.loadNext()?.subscribe(() => {
          afterNextRender(
            () => {
              this.scrollToId(id);
            },
            { injector: this.injector },
          );
        });

        initialScrollToContact.destroy();
      } else this.loadNext()?.subscribe();
    });

    effect(() => {
      const el = this.contactList()?.nativeElement as HTMLDivElement;
      if (!el) return;

      const contact = this.contactsStore.lastUpdatedContact();
      if (!contact) return;

      afterNextRender(
        () => {
          this.scrollToId(contact.id);
        },
        { injector: this.injector },
      );
    });
  }

  async scrollToId(id: string) {
    const el = (this.contactList()?.nativeElement as HTMLDivElement) ?? null;
    if (!el) return;

    el.querySelector(`#contact-${id}`)?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  scrollTop() {
    (this.contactList()?.nativeElement as HTMLDivElement).scrollTo({ behavior: 'smooth', top: 0 });
  }

  loadNext() {
    return this.contactsStore.loadNext();
  }
}
