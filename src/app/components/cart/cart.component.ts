import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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
  quantity: FormControl = new FormControl(1);

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getAll().subscribe((data) => {
      this.cartItems = data;
    });
  }

  updateItemQuantity(item: CartItem) {
    if (this.quantity?.value < 1) {
      this.quantity?.setValue(1);
    } else if (this.quantity?.value > 10) {
      this.quantity?.setValue(10);
    }
    this.cartService.update(item.id as string, this.quantity.value);
  }

  removeItem(item: CartItem) {
    this.cartService
      .delete(item.id as string)
      .then(() => {
        alert('Item called "' + item.name + '" deleted!');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
