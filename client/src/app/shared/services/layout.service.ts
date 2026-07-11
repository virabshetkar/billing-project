import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Service()
export class LayoutService {
  readonly #bp = inject(BreakpointObserver);

  isDesktopView = toSignal(
    this.#bp
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map((value) => !value.matches)),
  );
}
