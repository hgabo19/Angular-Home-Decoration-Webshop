import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DecorationsComponent } from './components/decorations/decorations.component';
import { BestSellingComponent } from './components/best-selling/best-selling.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, DecorationsComponent, BestSellingComponent, CartComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
