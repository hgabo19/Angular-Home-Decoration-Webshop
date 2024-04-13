import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'home-decoration-webshop';
  currentUser?: firebase.default.User | null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        console.log(user);

        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      },
      (error) => {
        console.error(error);
        localStorage.setItem('user', JSON.stringify('null'));
      }
    );
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Logged out');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
