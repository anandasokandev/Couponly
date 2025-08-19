
import { Injectable } from '@angular/core';
import { CustomToastComponent } from '../../features/admin/pages/custom-toast/custom-toast.component';


@Injectable({ providedIn: 'root' })
export class CustomToastService {
  private toastComponent?: CustomToastComponent;

  register(toast: CustomToastComponent) {
    this.toastComponent = toast;
  }

  show(message: string, type:'success' | 'danger' | 'warning' |'info' = 'info') {
    if (this.toastComponent) {
      this.toastComponent.showToast(message, type);
    } else {
      console.warn('ToastComponent not registered.');
    }
  }
}
