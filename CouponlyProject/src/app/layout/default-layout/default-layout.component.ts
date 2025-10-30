import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  INavData,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { adminNavItems, storeNavItems } from './_nav';
import { ToastService } from '../../commons/services/Toaster/toast.service';
import { ToastComponent } from '../../features/admin/pages/toast/toast.component';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageLoaderComponent } from '../../features/admin/pages/page-loader/page-loader.component';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective,
    ToastComponent,
    CommonModule,
    PageLoaderComponent
  ]
})
export class DefaultLayoutComponent {
  public navItems: INavData[] = [];

  loadPage: boolean = false;
  readonly #router = inject(Router);
  @ViewChild(PageLoaderComponent) pageLoaderComponent!: PageLoaderComponent;

  constructor(public toast: ToastService) {
    this.subscribeToRouterEvents();
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.#router.navigate(['/login']);
    }
    else
    {
      const userRole = sessionStorage.getItem('role');
      if (userRole === 'Admin') {
        this.navItems = adminNavItems;
      } else if (userRole === 'Store') {
        this.navItems = storeNavItems;
      } else {
        this.navItems = [];
      }
    }
  }

  private subscribeToRouterEvents(): void {
    this.#router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Show loader when navigation starts
        this.pageLoaderComponent.show();
        this.loadPage = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Hide loader when navigation ends, is canceled, or errors
        this.pageLoaderComponent.hide();
        this.loadPage = false;
      }
    });
  }

  onRemove(id: number) {
    this.toast.remove(id);
  }
}
