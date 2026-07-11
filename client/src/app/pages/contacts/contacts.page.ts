import { LayoutModule } from '@angular/cdk/layout';
import { ComponentPortal } from '@angular/cdk/portal';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarPortal } from '../../shared/services/sidebar-portal';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-contacts',
  imports: [CdkTableModule, LayoutModule, RouterOutlet],
  templateUrl: './contacts.page.html',
  styleUrl: './contacts.page.css',
})
export class ContactsPage implements OnInit, OnDestroy {
  readonly #sidebar = inject(SidebarPortal);

  ngOnInit(): void {
    this.#sidebar.set(new ComponentPortal(Sidebar));
  }

  ngOnDestroy(): void {
    this.#sidebar.clear();
  }
}
