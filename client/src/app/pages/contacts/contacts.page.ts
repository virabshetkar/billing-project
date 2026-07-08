import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-contacts',
  imports: [CdkTableModule, LayoutModule, RouterOutlet, Sidebar, Navbar],
  templateUrl: './contacts.page.html',
  styleUrl: './contacts.page.css',
})
export class ContactsPage {
  readonly #bp = inject(BreakpointObserver);

  showSidebar = toSignal(
    this.#bp
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map((value) => !value.matches)),
  );
}
