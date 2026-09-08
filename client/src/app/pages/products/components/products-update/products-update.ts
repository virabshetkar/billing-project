import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductsStore } from '../../services/products.store';
import { Loading } from '../../../../shared/components/loading/loading';

interface UpdateProductForm {
  title: string;
  description: string;
}

@Component({
  selector: 'app-products-update',
  imports: [FormField, Loading],
  templateUrl: './products-update.html',
  styleUrl: './products-update.css',
})
export class ProductsUpdate implements OnDestroy {
  private readonly router = inject(Router);
  private readonly productsStore = inject(ProductsStore);

  protected readonly id = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['productId'])),
  );
  protected readonly product = this.productsStore.selectedProduct;

  protected readonly productModel = signal<UpdateProductForm>({
    title: '',
    description: '',
  });

  protected readonly productForm = form(this.productModel, (schema) => {
    required(schema.title, { message: 'Title is required' });
  });

  constructor() {
    effect(() => {
      const product = this.product.value();

      if (!product) return;

      this.productModel.set({
        ...product,
      });
    });
    effect(() => {
      this.productsStore.setProductId(this.id());
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.productForm().invalid()) return;
    this.productsStore.update(this.id(), this.productModel()).subscribe({
      next: () => {
        this.product.reload();
        this.productsStore.products.reload();
      },
    });
  }

  onDelete() {
    this.productsStore.delete(this.id()).subscribe({
      next: () => {
        this.productsStore.products.reload();
        this.router.navigate(['/products']);
      },
    });
  }

  unchanged = computed(() => {
    const product1 = this.product.value();
    const product2 = this.productModel();

    if (!product1) return false;

    return product1.title === product2.title && product1.description === product2.description;
  });

  ngOnDestroy(): void {
    this.productsStore.setProductId('');
  }
}
