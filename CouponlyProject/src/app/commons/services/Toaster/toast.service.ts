import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  toasts$: Observable<Toast[]> = this.toasts.asObservable();
  private idCounter = 0;

  show(toast: Omit<Toast, 'id'>): void {
    this.idCounter++;
    const newToast: Toast = { id: this.idCounter, ...toast };

    // Add the new toast
    const currentToasts = this.toasts.getValue();
    this.toasts.next([...currentToasts, newToast]);

    // Set a timeout to automatically remove it
    setTimeout(() => {
      this.remove(newToast.id);
    }, toast.duration || 5000);
  }

  remove(id: number): void {
    const updatedToasts = this.toasts.getValue().filter(t => t.id !== id);
    this.toasts.next(updatedToasts);
  }
}
