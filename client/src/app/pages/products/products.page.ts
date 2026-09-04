import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EnvironmentInjector, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarPortal } from '../../shared/services/sidebar-portal';
import { Sidebar } from './components/sidebar/sidebar';
import { UiStore } from '../../shared/stores/ui.store';

@Component({
  selector: 'app-products',
  imports: [RouterOutlet],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage implements OnInit, OnDestroy {
  readonly #sidebar = inject(SidebarPortal);
  private readonly uiStore = inject(UiStore);
  private readonly environmentInjector = inject(EnvironmentInjector);

  ngOnInit(): void {
    this.#sidebar.set(new ComponentPortal(Sidebar, null, this.environmentInjector));
    this.uiStore.updateApp('products');
  }

  ngOnDestroy(): void {
    this.#sidebar.clear();
  }
}
