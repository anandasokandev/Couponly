import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
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
import { navItems } from './_nav';
import { CustomToastComponent } from '../../features/admin/pages/custom-toast/custom-toast.component';
import { CustomToastService } from '../../commons/services/custom-toast.service';
import { ToastService } from '../../commons/services/Toaster/toast.service';
import { ToastComponent } from '../../features/admin/pages/toast/toast.component';
import { CommonModule } from '@angular/common';

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
    CustomToastComponent,
    ToastComponent,
    CommonModule
  ]
})
export class DefaultLayoutComponent {
  public navItems = [...navItems];

 @ViewChild(CustomToastComponent) toastComponent!: CustomToastComponent;

  constructor(private toastService: CustomToastService, public toast: ToastService) {}

  onRemove(id: number) {
    this.toast.remove(id);
  }

  ngAfterViewInit(): void {
    this.toastService.register(this.toastComponent);
  }
}
