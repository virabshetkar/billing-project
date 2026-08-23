import { Component, effect, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SidebarPortal } from '../../services/sidebar-portal';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-mobile',
  imports: [OverlayModule, RouterOutlet, Navbar],
  templateUrl: './mobile.layout.html',
  styleUrl: './mobile.layout.css',
})
export class MobileLayout {
  readonly #sidebar = inject(SidebarPortal);

  eff = [
    effect(() => {
      const portal = this.#sidebar.portal();
      if (!portal) return;
      this.#sidebar.open();
    }),
  ];
}
