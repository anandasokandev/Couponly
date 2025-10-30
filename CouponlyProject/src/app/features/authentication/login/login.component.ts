import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './../../../commons/services/Authentication/login.service';
import { SpinnerModule } from '@coreui/angular';
import { ToastComponent } from '../../admin/pages/toast/toast.component';
import { ToastService } from '../../../commons/services/Toaster/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    SpinnerModule,
    ToastComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  showPassword = false;
  isLoading = false;

  constructor(
    public toast: ToastService,
    private fb: FormBuilder,
    private api: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    const payload = this.loginForm.value;



    this.api.login(payload).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.isSuccess) {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('role', response.data.role);
          sessionStorage.setItem('userId', response.data.userId);
          console.log(sessionStorage.getItem('role'))
          console.log(sessionStorage.getItem('userId'))
          // localStorage.setItem('token', response.data.token);
          // localStorage.setItem('role', response.data.role);
          // localStorage.setItem('userId', response.data.userId);
          // console.log(localStorage.getItem('role'));
          // console.log(localStorage.getItem('userId'));
          if (response.data.role === 'Admin') {
            this.router.navigate(['/admin']);
          } else if (response.data.role === 'User') {
            this.router.navigate(['/user']);
          } else if (response.data.role === 'Store') {
            this.router.navigate(['/store']);
          } else {
            console.log('Unrecognized role:', response.role);
            this.errorMessage = 'Unrecognized role';
          }

          this.errorMessage = '';
        } else {
          console.log(response);
          this.errorMessage = response.message || 'Invalid credentials';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Invalid Username or Password';
        this.isLoading = false;
      },
    });
  }

  reset() {
    this.loginForm.reset();
    this.errorMessage = '';
  }

  onRemove(id: number) {
    this.toast.remove(id);
  }
}
