import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarPortal } from '../../../../shared/services/sidebar-portal';
import { ContactsStore } from '../../services/contacts.store';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  items: { name: string; id: string }[] = [];
  contacts = inject(ContactsStore).contacts;
  contactList = viewChild('contactList', { read: ElementRef<HTMLDivElement> });

  readonly sidebarPortal = inject(SidebarPortal);

  scrollTop() {
    (this.contactList()?.nativeElement as HTMLDivElement).scrollTo({ behavior: 'smooth', top: 0 });
  }
}
