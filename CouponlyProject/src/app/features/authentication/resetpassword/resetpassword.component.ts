import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from '../../../commons/services/Authentication/forgot-password.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  token: string = '';
  isTokenValid: boolean = false;

  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  email: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forgotPasswordService: ForgotPasswordService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token') || '';
      if (this.token) {
        this.verifyToken(this.token);
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  private verifyToken(token: string): void {
    this.forgotPasswordService.verifyToken({ token }).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.isTokenValid = true;
          this.email = res.data.email; 
        } else {
          this.router.navigate(['/404']);
        }
      },
      error: () => this.router.navigate(['/404'])
    });
  }

onSubmit() {
  this.errorMessage = '';
  this.successMessage = '';

  if (this.newPassword !== this.confirmPassword) {
    this.errorMessage = "Passwords do not match!";
    return;
  }

  this.forgotPasswordService.updatePassword(this.email, {
    newPassword: this.newPassword,
    confirmPassword: this.confirmPassword
  }).subscribe({
    next: (res) => {
      if (res && res.isSuccess) {
        this.successMessage = "Password updated successfully!";
        this.errorMessage = "";

        setTimeout(() => {
          this.router.navigateByUrl('/login'); 
        }, 2000);

      } else {
        this.errorMessage = res?.message || "Password update failed.";
        this.successMessage = "";
      }
    },
    error: (err) => {
      this.errorMessage = err?.error?.message || "An error occurred while updating password.";
      this.successMessage = "";
    }
  });
}

}
