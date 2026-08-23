import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Product } from '../models/products';

@Service()
export class ProductsApi {
  readonly #http = inject(HttpClient);

  products = httpResource<Product[]>(() => '/api/products');

  selectedProduct = httpResource<Product>(() =>
    this.productId() ? `/api/products/${this.#productId()}` : undefined,
  );

  readonly #productId = signal('');
  productId = this.#productId.asReadonly();

  setProductId(id: string) {
    this.#productId.set(id);
  }

  create(product: { title: string; description: string }) {
    return this.#http.post<Product>('/api/products', product);
  }

  update(id: string, product: { title: string; description: string }) {
    return this.#http.put<Product>(`/api/products/${id}`, product);
  }

  delete(id: string) {
    return this.#http.delete(`/api/products/${id}`);
  }
}
