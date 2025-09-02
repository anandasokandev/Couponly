import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalTitleDirective,
  ButtonCloseDirective,
  ButtonDirective,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  ModalToggleDirective
} from '@coreui/angular';
import { UserService } from '../../../../commons/services/Users/user.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ButtonDirective,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ModalToggleDirective
  ],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss'
})
export class EditUserModalComponent {
  @Input() user: any = null;
  @Output() save: EventEmitter<void> = new EventEmitter<void>();


  localUser: any = null;
 constructor(private userService: UserService) {}
  private toast = inject(ToastService);





ngOnChanges(changes: SimpleChanges) {
  if (changes['user'] && this.user) {
    this.localUser = { ...this.user };
  }
}

saveChanges() {
  if (this.localUser && this.localUser.id) {
    // console.log('Sending user update:', this.localUser);

    this.userService.updateUser(this.localUser).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.toast.show({ type: 'success', message: '✅ User updated successfully!' });
          document.getElementById('verticallyCenteredScrollableModal')?.click();
           setTimeout(() => window.location.reload(), 500);
        } else {
          this.toast.show({ type: 'warning', message: response.statusMessage || 'Update completed with warnings.' });
        }
        this.save.emit(); 
      },
      error: (err) => {
        const errorMsg = err.error?.errors?.[0] || '❌ Failed to update user.';
        this.toast.show({ type: 'error', message: errorMsg });
        console.error('Update failed:', err);
      }
    });
  } else {
    this.toast.show({ type: 'warning', message: '⚠️ Invalid user data. Cannot update.' });
  }
}

}

