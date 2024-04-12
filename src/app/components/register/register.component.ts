import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.createRegisterForm();
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  alreadyRegistered() {
    this.location.back();
  }

  createRegisterForm() {
    let FormGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
    });
    return FormGroup;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.get('email')?.value as string,
          this.registerForm.get('password')?.value as string
        )
        .then((cretentials) => {
          console.log(cretentials);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}
