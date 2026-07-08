import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ProductsApi } from '../../services/products.api';
import { Router } from '@angular/router';

interface CreateProductForm {
  title: string;
  description: string;
}

@Component({
  selector: 'app-products-create',
  imports: [FormField],
  templateUrl: './products-create.html',
  styleUrl: './products-create.css',
})
export class ProductsCreate {
  readonly #router = inject(Router);
  readonly #productsApi = inject(ProductsApi);

  productModel = signal<CreateProductForm>({
    title: '',
    description: '',
  });

  productForm = form(this.productModel, (schema) => {
    required(schema.title, { message: 'Title is required' });
  });

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.productForm().invalid()) return;
    this.#productsApi.create(this.productModel()).subscribe({
      next: (product) => {
        this.#productsApi.products.reload();
        this.#router.navigate(['/products', product.id]);
      },
    });
  }
}
