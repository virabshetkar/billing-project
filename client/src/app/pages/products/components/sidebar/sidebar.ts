import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { SidebarPortal } from '../../../../shared/services/sidebar-portal';
import { ProductsStore } from '../../services/products.store';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly #router = inject(Router);
  readonly icons = { faTrashAlt };
  readonly sidebarPortal = inject(SidebarPortal);
  readonly productsStore = inject(ProductsStore);

  products = inject(ProductsStore).products;
  productId = this.productsStore.selectedProductId;

  onDelete(id: string) {
    this.productsStore.delete(id).subscribe({
      next: () => {
        this.productsStore.products.reload();
        const productId = this.productId();

        if (!productId || productId !== id) return;
        this.#router.navigate(['/products']);
      },
    });
  }
}
