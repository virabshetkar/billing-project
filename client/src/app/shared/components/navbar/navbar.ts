import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';

type NavItem = {
  name: string;
  route: string;
};

type NavItems = NavItem[];

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CdkMenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly #route = inject(ActivatedRoute);

  navItems: NavItems = [
    {
      name: 'Contacts',
      route: 'contacts',
    },
    {
      name: 'Products',
      route: 'products',
    },
  ];
}
