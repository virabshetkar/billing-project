import { httpResource, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withProps, withMethods, patchState } from '@ngrx/signals';
import { Product } from '../models/products';

export type ProductState = {
  selectedProductId: string | undefined;
};

export type CreateProductDto = {
  title: string;
  description: string;
};

export type UpdateProductDto = {
  title: string;
  description: string;
};

export const ProductsStore = signalStore(
  withState<ProductState>({ selectedProductId: '' }),
  withProps((store) => ({
    products: httpResource<Product[]>(() => '/api/products'),
    selectedProduct: httpResource<Product>(() =>
      store.selectedProductId?.() ? `/api/products/${store.selectedProductId()}` : undefined,
    ),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    setProductId(id: string) {
      patchState(store, (state) => ({ ...state, selectedProductId: id }));
    },
    create(product: CreateProductDto) {
      return http.post<Product>('/api/products', product);
    },
    update(id: string, product: UpdateProductDto) {
      return http.put<Product>(`/api/products/${id}`, product);
    },
    delete(id: string) {
      return http.delete<Product>(`/api/products/${id}`);
    },
  })),
);
