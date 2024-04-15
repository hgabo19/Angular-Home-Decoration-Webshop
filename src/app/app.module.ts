import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LoginModule } from './components/login/login.module';
import { RegisterModule } from './components/register/register.module';
import { MatIconModule } from '@angular/material/icon';
import { DecorationsModule } from './components/decorations/decorations.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    RegisterModule,
    MatIconModule,
    AngularFireModule.initializeApp({
      projectId: 'home-decor-webshop-proje-b44f8',
      appId: '1:491444131116:web:617f82c235b8bf1b8a0889',
      storageBucket: 'home-decor-webshop-proje-b44f8.appspot.com',
      apiKey: 'AIzaSyBoT-DVqmmTLDndgIgSuqdnGtkR73583sM',
      authDomain: 'home-decor-webshop-proje-b44f8.firebaseapp.com',
      messagingSenderId: '491444131116',
      measurementId: 'G-KTYNE1GZ5Z',
    }),
    // provideFirebaseApp(() =>
    //   initializeApp({
    //     projectId: 'home-decor-webshop-proje-b44f8',
    //     appId: '1:491444131116:web:617f82c235b8bf1b8a0889',
    //     storageBucket: 'home-decor-webshop-proje-b44f8.appspot.com',
    //     apiKey: 'AIzaSyBoT-DVqmmTLDndgIgSuqdnGtkR73583sM',
    //     authDomain: 'home-decor-webshop-proje-b44f8.firebaseapp.com',
    //     messagingSenderId: '491444131116',
    //     measurementId: 'G-KTYNE1GZ5Z',
    //   })
    // ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
