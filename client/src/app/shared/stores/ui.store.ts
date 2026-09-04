import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { LayoutService } from '../services/layout.service';

export type UiState = {
  theme: string;
  currentApp: string;
};

export const UiStore = signalStore(
  { providedIn: 'root' },
  withState<UiState>({
    theme: 'dark',
    currentApp: '',
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
    };
  }),
);
