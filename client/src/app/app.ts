import { Component, inject } from '@angular/core';
import { UiStore } from './shared/stores/ui.store';
import { DesktopLayout } from './shared/layouts/desktop/desktop.layout';
import { MobileLayout } from './shared/layouts/mobile/mobile.layout';
import { RouterLoadingService } from './shared/services/router-loading.service';

@Component({
  selector: 'app-root',
  imports: [DesktopLayout, MobileLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly uiStore = inject(UiStore);

  protected readonly isDesktopView = this.uiStore.isDesktopView;
  protected readonly isLoading = inject(RouterLoadingService).routeLoading;

  constructor() {
    this.uiStore.registerApp({
      displayTitle: 'Contacts',
      route: 'contacts',
    });
    this.uiStore.registerApp({
      displayTitle: 'Products',
      route: 'products',
    });
  }
}
