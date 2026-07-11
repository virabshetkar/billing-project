import { ComponentPortal } from '@angular/cdk/portal';
import { Service, signal } from '@angular/core';

@Service()
export class SidebarPortal {
  readonly #portal = signal<ComponentPortal<unknown> | null>(null);
  portal = this.#portal.asReadonly();

  set(portal: ComponentPortal<unknown>) {
    this.#portal.set(portal);
  }

  clear() {
    this.#portal.set(null);
  }
}
