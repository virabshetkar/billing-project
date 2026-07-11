import { PortalModule } from '@angular/cdk/portal';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { Navbar } from './shared/components/navbar/navbar';
import { UiStore } from './shared/stores/ui.store';
import { DesktopLayout } from './shared/layouts/desktop/desktop.layout';
import { MobileLayout } from './shared/layouts/mobile/mobile.layout';

@Component({
  selector: 'app-root',
  imports: [DesktopLayout, MobileLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly #ui = inject(UiStore);
  isDesktopView = this.#ui.isDesktopView;
}
