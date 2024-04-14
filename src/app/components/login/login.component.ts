import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(
      this.email?.value as string,
      this.password?.value as string
    );
    this.email.setValue('');
    this.password.setValue('');
    this.router.navigateByUrl('');
  }
}
