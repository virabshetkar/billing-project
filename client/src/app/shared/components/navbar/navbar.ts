import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiStore } from '../../stores/ui.store';

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
  path = inject(UiStore).currentApp;

  readonly currentName = computed(() => {
    return this.navItems.find((v) => v.route === this.path())?.name ?? 'Menu';
  });

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
