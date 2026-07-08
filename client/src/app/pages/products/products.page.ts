import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-products',
  imports: [RouterOutlet, Sidebar, Navbar],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage {}
