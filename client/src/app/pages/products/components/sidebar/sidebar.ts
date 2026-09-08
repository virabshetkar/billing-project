import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SidebarInterface, SidebarPortal } from '../../../../shared/services/sidebar-portal';
import { ProductsStore } from '../../services/products.store';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements SidebarInterface {
  readonly sidebarPortal = inject(SidebarPortal);
  readonly productsStore = inject(ProductsStore);

  products = inject(ProductsStore).products;

  scrollTop(): void {}
}
