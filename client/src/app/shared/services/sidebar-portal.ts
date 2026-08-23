import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Service, signal } from '@angular/core';

@Service({
  autoProvided: true,
})
export class SidebarPortal {
  readonly #portal = signal<ComponentPortal<unknown> | null>(null);
  portal = this.#portal.asReadonly();

  readonly #overlay = inject(Overlay);

  overlayref = this.#overlay.create({
    positionStrategy: this.#overlay.position().global().left(),
    scrollStrategy: this.#overlay.scrollStrategies.block(),
    backdropClass: 'gray-out',
    panelClass: 'overlay-panel',
    hasBackdrop: true,
  });

  set(portal: ComponentPortal<unknown>) {
    this.#portal.set(portal);
  }

  clear() {
    this.#portal.set(null);
  }

  open() {
    this.overlayref.attach(this.portal());

    const sub = this.overlayref.backdropClick().subscribe(() => {
      this.overlayref.detach();
      sub.unsubscribe();
    });
  }

  close() {
    this.overlayref.detach();
  }
}
