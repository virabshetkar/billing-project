import { ComponentPortal } from '@angular/cdk/portal';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarPortal } from '../../shared/services/sidebar-portal';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-products',
  imports: [RouterOutlet],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage implements OnInit, OnDestroy {
  readonly #sidebar = inject(SidebarPortal);

  ngOnInit(): void {
    this.#sidebar.set(new ComponentPortal(Sidebar));
  }

  ngOnDestroy(): void {
    this.#sidebar.clear();
  }
}
