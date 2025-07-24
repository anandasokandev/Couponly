import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Call backend API to update password
    console.log('Reset password:', {
      current: this.currentPassword,
      new: this.newPassword
    });
    
  }
}
