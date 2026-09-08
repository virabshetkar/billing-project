import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiStore } from '../../stores/ui.store';
import { LayoutService } from '../../services/layout.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SidebarPortal } from '../../services/sidebar-portal';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CdkMenuModule, FaIconComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly sidebarPortal = inject(SidebarPortal);
  protected readonly isSidebarAvailable = computed(() => {
    return !!this.sidebarPortal.portal();
  });

  protected readonly isDesktopView = inject(LayoutService).isDesktopView;
  protected readonly icons = { faBars };
  protected readonly apps = inject(UiStore).apps;

  private readonly title = inject(UiStore).currentApp;

  readonly currentName = computed(() => {
    return this.title() ?? 'Menu';
  });

  openSidebar() {
    this.sidebarPortal.open();
  }
}
