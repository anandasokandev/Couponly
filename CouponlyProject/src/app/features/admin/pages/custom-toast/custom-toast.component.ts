import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-toast',
  imports: [CommonModule],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.scss',
  
})
export class CustomToastComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  show = false;

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    console.log('ToastComponent received:', message, type);
    this.message = message;
    this.type = type;
    this.show = true;
    setTimeout(() => this.show = false, 3000);
  }

    closeToast() {
    this.show = false;
  }
}
