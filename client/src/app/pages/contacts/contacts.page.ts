import { LayoutModule } from '@angular/cdk/layout';
import { ComponentPortal } from '@angular/cdk/portal';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, EnvironmentInjector, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarPortal } from '../../shared/services/sidebar-portal';
import { Sidebar } from './components/sidebar/sidebar';
import { UiStore } from '../../shared/stores/ui.store';

@Component({
  selector: 'app-contacts',
  imports: [CdkTableModule, LayoutModule, RouterOutlet],
  templateUrl: './contacts.page.html',
  styleUrl: './contacts.page.css',
})
export class ContactsPage implements OnInit, OnDestroy {
  private readonly uiStore = inject(UiStore);
  readonly #sidebar = inject(SidebarPortal);
  readonly #environmentInjector = inject(EnvironmentInjector);

  ngOnInit(): void {
    const componentPortal = new ComponentPortal(Sidebar, null, this.#environmentInjector);
    this.#sidebar.set(componentPortal);
    this.uiStore.updateApp('Contacts');
  }

  ngOnDestroy(): void {
    this.#sidebar.clear();
  }
}
