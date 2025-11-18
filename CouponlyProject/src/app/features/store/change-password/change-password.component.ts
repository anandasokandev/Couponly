import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, CardBodyComponent, CardHeaderComponent, ColComponent, RowComponent, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  resetForm: FormGroup;
  showCurrent = false;
  showPassword = false;
  showConfirm = false;
  submitting = false;
  errorMessage = '';
  currentPassword = '';
  success = false;
  passwordStrength = 0;
  passwordStrengthLabel = 'Weak';

  constructor(private fb: FormBuilder) {
    this.resetForm = this.fb.group(
      {
      currentPassword: ['', [Validators.required]],
      password: [
        '',
        [
        Validators.required,
        Validators.minLength(8),
        // require at least one uppercase letter, one digit and one special character
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
        ]
      ],
      confirmPassword: ['', [Validators.required]]
      },
      {
      validators: (group: FormGroup) => {
        const pw = group.get('password')?.value;
        const cpw = group.get('confirmPassword')?.value;
        const current = group.get('currentPassword')?.value;
        // reuse existing mismatch check
        if (pw !== cpw) return { mismatch: true };
        // if a stored current password is available, ensure the entered currentPassword matches it
        if (this.currentPassword && current !== this.currentPassword) return { currentInvalid: true };
        // ensure new password is not the same as the current password supplied in the form
        if (pw && current && pw === current) return { sameAsCurrent: true };
        return null;
      }
      }
    );

    this.resetForm.get('password')?.valueChanges.subscribe((val: string) => {
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
    });
  }

  passwordsMatch(group: FormGroup) {
    const pw = group.get('password')?.value;
    const cpw = group.get('confirmPassword')?.value;
    return pw === cpw ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.errorMessage = '';
    this.success = false;

    // Replace with real save logic / HTTP call
    setTimeout(() => {
      this.submitting = false;
      this.success = true;
    }, 500);
  }
}
