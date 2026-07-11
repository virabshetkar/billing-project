import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SidebarPortal } from '../../services/sidebar-portal';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'app-desktop',
  imports: [LayoutModule, RouterOutlet, Navbar, PortalModule],
  templateUrl: './desktop.layout.html',
  styleUrl: './desktop.layout.css',
})
export class DesktopLayout {
  portal = inject(SidebarPortal).portal;
  showSidebar = toSignal(
    inject(BreakpointObserver)
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map((value) => !value.matches)),
  );
}
