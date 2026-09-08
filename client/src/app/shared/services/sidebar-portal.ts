import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, inject, Service, signal } from '@angular/core';

export interface SidebarInterface {
  scrollTop(): void;
}

@Service({
  autoProvided: true,
})
export class SidebarPortal {
  readonly #portal = signal<ComponentPortal<SidebarInterface> | null>(null);
  portal = this.#portal.asReadonly();
  sidebarRef = signal<ComponentRef<SidebarInterface> | null>(null);

  readonly #overlay = inject(Overlay);

  overlayref = this.#overlay.create({
    positionStrategy: this.#overlay.position().global().left(),
    scrollStrategy: this.#overlay.scrollStrategies.block(),
    backdropClass: 'gray-out',
    panelClass: 'overlay-panel',
    hasBackdrop: true,
  });

  set(portal: ComponentPortal<SidebarInterface>) {
    this.#portal.set(portal);
  }

  clear() {
    this.#portal.set(null);
  }

  open() {
    if (!this.portal()) return;

    this.sidebarRef.set(this.overlayref.attach(this.portal()!));

    const sub = this.overlayref.backdropClick().subscribe(() => {
      this.overlayref.detach();
      sub.unsubscribe();
    });
  }

  close() {
    this.overlayref.detach();
  }

  scrollTop() {
    console.log('Called!');
    this.sidebarRef()?.instance.scrollTop();
  }
}
