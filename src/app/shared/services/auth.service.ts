import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.fireAuth.user;
  }

  logout() {
    return this.fireAuth.signOut();
  }
}
