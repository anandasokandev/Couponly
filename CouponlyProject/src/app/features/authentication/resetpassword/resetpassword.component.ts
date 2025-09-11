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

  private verifyToken(token: string): void {
    this.forgotPasswordService.verifyToken({ token }).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.isTokenValid = true;
          this.email = res.data.email.email; 
          this.role =res.data.email.role;
          console.log(res)
        } else {
          this.router.navigate(['/404']);
        }
      },
      error: () => this.router.navigate(['/404'])
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
