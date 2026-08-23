import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContactsApi } from '../../services/contacts.api';
import { SidebarPortal } from '../../../../shared/services/sidebar-portal';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  items: { name: string; id: string }[] = [];
  contacts = inject(ContactsApi).contacts;

  readonly sidebarPortal = inject(SidebarPortal);
}
