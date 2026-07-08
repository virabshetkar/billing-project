import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsApi } from '../../services/products.api';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly #productsApi = inject(ProductsApi);
  readonly #router = inject(Router);

  productId = this.#productsApi.productId;

  products = inject(ProductsApi).products;

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
