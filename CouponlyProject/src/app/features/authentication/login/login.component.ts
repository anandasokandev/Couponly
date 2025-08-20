import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from './../../../commons/services/Authentication/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private api: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    const payload = this.loginForm.value;

    this.api.login(payload).subscribe({
      next: (response: any) => {
        console.log(response)
       if (response.isSuccess) {
  console.log('Login successful:', response);

                     
                      sessionStorage.setItem('token', response.data.token);
                      sessionStorage.setItem('role', response.data.role);
                      sessionStorage.setItem('userId',response.data.userId);
                       

                    

                      if (response.data.role === 'Admin') {
                        this.router.navigate(['/admin']);
                      } 
                      else if (response.data.role === 'User') {
                        this.router.navigate(['/user']);
                      } 
                      else if (response.data.role === 'Store') {
                        this.router.navigate(['/store']);
                      } 
                      else {
                        console.log('Unrecognized role:', response.role);
                        this.errorMessage = 'Unrecognized role';
                      }

                      this.errorMessage = '';
                    } else {
                      console.log(response);
                      this.errorMessage = response.message || 'Invalid credentials';
                    }


   
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'An error occurred while logging in';
      }
    });
  }

  reset() {
    this.loginForm.reset();
    this.errorMessage = '';
  }
}
