import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { LayoutService } from '../services/layout.service';

export type UiState = {
  isDesktopView: boolean;
  isMobileView: boolean;
};

export const UiStore = signalStore(
  { providedIn: 'root' },
  withProps(() => ({
    layout: inject(LayoutService),
  })),
  withComputed(({ layout }) => ({
    isDesktopView: layout.isDesktopView,
    isMobileView: computed(() => !layout.isDesktopView()),
  })),
);
