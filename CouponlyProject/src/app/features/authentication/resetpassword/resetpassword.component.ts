import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from '../../../commons/services/Authentication/forgot-password.service';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@coreui/angular';
import { StoreService } from '../../../commons/services/Store/store.service';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormsModule, CommonModule,SpinnerModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  token: string = '';
  isTokenValid: boolean = false;
    isLoading: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  isError: boolean = false;
  email: string = ''; 
  role: String='';
  showPassword = false;
  showRePassword = false;
  passwordStrength: number = 0;
  passwordStrengthLabel: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forgotPasswordService: ForgotPasswordService,
    private storeApi: StoreService
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

  updatePasswordStrength(val: string) {
     const len = val ? val.length : 0;
      if (!val) {
      this.passwordStrength = 0;
      this.passwordStrengthLabel = '';
      return;
      }

      const hasUpper = /[A-Z]/.test(val);
      const hasDigit = /\d/.test(val);
      const hasSpecial = /[^A-Za-z0-9]/.test(val);

      let score = 0;
      // length scoring
      if (len >= 12) score += 40;
      else if (len >= 8) score += 20;
      else if (len >= 4) score += 10;
      else score += 5;

      // character type scoring
      if (hasUpper) score += 20;
      if (hasDigit) score += 20;
      if (hasSpecial) score += 20;

      this.passwordStrength = Math.min(100, score);

      if (this.passwordStrength >= 80) {
        this.passwordStrengthLabel = 'Strong';
      } else if (this.passwordStrength >= 50) {
        this.passwordStrengthLabel = 'Medium';
      } else {
        this.passwordStrengthLabel = 'Weak';
      }
    }


  private verifyToken(token: string): void {
    this.forgotPasswordService.verifyToken({ token }).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.isTokenValid = true;
          this.email = res.data.email.email; 
          this.role =res.data.email.role;
          console.log(res)
        } else {
          this.router.navigate(['/500']);
        }
      },
      error: () => this.router.navigate(['/500'])
    });
  }

onSubmit() {
  this.message = '';

  if (this.newPassword !== this.confirmPassword) {
    this.message = "Passwords do not match!";
    this.isError = true;
    return;
  }
  this.isLoading = true;

  if(this.role=='User'){
  this.forgotPasswordService.updatePassword(this.email, {
    newPassword: this.newPassword,
    confirmPassword: this.confirmPassword
  }).subscribe({
    next: (res) => {
       this.isLoading = false;
      if (res && res.isSuccess) {
  this.message = "Password updated successfully!... Redirecting to Login Page";
  this.isError = false;


  setTimeout(() => {
    this.router.navigateByUrl('/login'); 
  }, 5000);
}
else {
        this.message = res?.message || "Password update failed.";
        this.isError = true;
      }
    },
    error: (err) => {
      this.isLoading = false;
      this.message = err?.error?.message || "An error occurred while updating password.";
      this.isError = true;
    }
  });
}
else if(this.role=='Store'){
 this.storeApi.updateStorePassword(this.email, {
    newPassword: this.newPassword,
    confirmPassword: this.confirmPassword
  }).subscribe({
    next: (res) => {
       this.isLoading = false;
      if (res && res.isSuccess) {
  this.message = "Password updated successfully!... Redirecting to Login Page";
  this.isError = false;


  setTimeout(() => {
    this.router.navigateByUrl('/login'); 
  }, 5000);
}
else {
        this.isLoading = false;
        this.message = res?.message || "Password update failed.";
        this.isError = true;
      }
    },
    error: (err) => {
      this.isLoading = false;
      this.message = err?.error?.message || "An error occurred while updating password.";
      this.isError = true;
    }
  });
}
}

}
