import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { LayoutService } from '../services/layout.service';

export interface NavItem {
  displayTitle: string;
  route: string;
}

export interface UiState {
  theme: string;
  currentApp: string;
  apps: NavItem[];
}

export const UiStore = signalStore(
  { providedIn: 'root' },
  withState<UiState>({
    theme: 'dark',
    currentApp: '',
    apps: [],
  }),
  withComputed((_, layout = inject(LayoutService)) => ({
    isDesktopView: layout.isDesktopView,
    isMobileView: computed(() => !layout.isDesktopView()),
  })),
  withMethods((store) => {
    return {
      updateApp(name: string) {
        patchState(store, (state) => ({ ...state, currentApp: name }));
      },
      registerApp(item: NavItem) {
        patchState(store, (state) => {
          return { ...state, apps: [...state.apps, item] };
        });
      },
    };
  }),
);
