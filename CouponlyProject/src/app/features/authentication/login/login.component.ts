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
      const { token, role, userId, storeId } = response.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);

      if (role === 'Store') {
        sessionStorage.setItem('storeId', storeId);
      } else {
        sessionStorage.setItem('userId', userId);
      }

      console.log('Role:', sessionStorage.getItem('role'));
      console.log('UserId:', sessionStorage.getItem('userId'));
      console.log('StoreId:', sessionStorage.getItem('storeId'));

      if (role === 'Admin') {
        this.router.navigate(['/admin']);
      } else if (role === 'User') {
        this.router.navigate(['/user']);
      } else if (role === 'Store') {
        this.router.navigate(['/store']);
      } else {
        console.log('Unrecognized role:', role);
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
