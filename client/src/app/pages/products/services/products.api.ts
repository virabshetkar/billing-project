import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Product } from '../models/products';

@Service()
export class ProductsApi {
  readonly #http = inject(HttpClient);

  products = httpResource<Product[]>(() => 'http://localhost:5085/api/products');

  selectedProduct = httpResource<Product>(() =>
    this.productId() ? `http://localhost:5085/api/products/${this.#productId()}` : undefined,
  );

  readonly #productId = signal('');
  productId = this.#productId.asReadonly();

  setProductId(id: string) {
    this.#productId.set(id);
  }

  create(product: { title: string; description: string }) {
    return this.#http.post<Product>('http://localhost:5085/api/products', product);
  }

  update(id: string, product: { title: string; description: string }) {
    return this.#http.put<Product>(`http://localhost:5085/api/products/${id}`, product);
  }

  delete(id: string) {
    return this.#http.delete(`http://localhost:5085/api/products/${id}`);
  }
}
