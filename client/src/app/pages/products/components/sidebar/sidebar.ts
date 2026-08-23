import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { ProductsApi } from '../../services/products.api';
import { SidebarPortal } from '../../../../shared/services/sidebar-portal';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly #productsApi = inject(ProductsApi);
  readonly #router = inject(Router);
  readonly icons = { faTrashAlt };
  readonly sidebarPortal = inject(SidebarPortal);

  products = inject(ProductsApi).products;
  productId = this.#productsApi.productId;

  onDelete(id: string) {
    this.#productsApi.delete(id).subscribe({
      next: () => {
        this.#productsApi.products.reload();
        const productId = this.productId();

        if (!productId || productId !== id) return;
        this.#router.navigate(['/products']);
      },
    });
  }
}
