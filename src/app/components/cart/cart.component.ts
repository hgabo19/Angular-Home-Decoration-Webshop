import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/shared/models/CartItem';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private cartSubscription: Subscription = new Subscription();
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getAll().subscribe((data) => {
      this.cartItems = data;
      console.log(this.cartItems);
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
