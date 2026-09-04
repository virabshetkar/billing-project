import { inject, Service, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';

@Service()
export class RouterLoadingService {
  private readonly router = inject(Router);

  private readonly isLoading = signal(false);
  readonly routeLoading = this.isLoading.asReadonly();

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.isLoading.set(true);
        } else {
          this.isLoading.set(false);
        }
      });
  }
}
