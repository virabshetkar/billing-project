import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { LayoutService } from '../services/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export type UiState = {
  isDesktopView: boolean;
  isMobileView: boolean;
};

export const UiStore = signalStore(
  { providedIn: 'root' },
  withState({
    theme: 'dark',
  }),
  withProps(() => ({
    layout: inject(LayoutService),
    router: inject(Router),
  })),
  withProps(({ router }) => {
    const currentApp = toSignal(
      router.events.pipe(
        filter((val) => val instanceof NavigationEnd),
        map((val) => val.url.split('/')[1] ?? ''),
        distinctUntilChanged(),
      ),
    );
    return { currentApp };
  }),
  withComputed(({ layout }) => ({
    isDesktopView: layout.isDesktopView,
    isMobileView: computed(() => !layout.isDesktopView()),
  })),
);
