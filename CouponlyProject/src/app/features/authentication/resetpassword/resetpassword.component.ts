import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from '../../../commons/services/Authentication/forgot-password.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  token: string = '';
  isTokenValid: boolean = false;

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
        } else {
       
          this.router.navigate(['/404']);
        }
      },
      error: () => {
        // API error → redirect to 404
        this.router.navigate(['/404']);
      }
    });
  }
}
