import { Component, inject } from '@angular/core';
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
  isDesktopView = inject(UiStore).isDesktopView;
}
