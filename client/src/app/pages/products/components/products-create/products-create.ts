import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ProductsStore } from '../../services/products.store';

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
  private readonly router = inject(Router);
  private readonly productsStore = inject(ProductsStore);

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
    this.productsStore.create(this.productModel()).subscribe({
      next: (product) => {
        this.productsStore.products.reload();
        this.router.navigate(['/products', product.id]);
      },
    });
  }
}
