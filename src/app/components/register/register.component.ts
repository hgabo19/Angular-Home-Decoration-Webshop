import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

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
    private authService: AuthService,
    private userService: UserService
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
        .then((credentials) => {
          console.log(credentials);
          const user: User = {
            id: credentials.user?.uid as string,
            email: this.registerForm.get('email')?.value as string,
            username: this.registerForm.get('username')?.value as string,
          };

          this.userService
            .create(user)
            .then((_) => {
              console.log('User created!');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}
