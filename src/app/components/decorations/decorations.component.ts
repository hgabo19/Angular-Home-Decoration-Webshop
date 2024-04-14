import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Decoration } from 'src/app/shared/models/Decoration';
import { User } from 'src/app/shared/models/User';
import { CartService } from 'src/app/shared/services/cart.service';
import { DecorationService } from 'src/app/shared/services/decoration.service';

@Component({
  selector: 'app-decorations',
  templateUrl: './decorations.component.html',
  styleUrls: ['./decorations.component.scss'],
})
export class DecorationsComponent implements OnInit, OnDestroy {
  private decorationsSubscription: Subscription = new Subscription();
  decorations: Decoration[] = [];
  currentUserId: string = '';
  constructor(
    private decorationService: DecorationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.decorationsSubscription = this.decorationService
      .getDecorations()
      .subscribe((data) => {
        this.decorations = data;
      });
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Parse the stored string back into a JavaScript object
      const user = JSON.parse(storedUser);
      if (user && user.uid) {
        this.currentUserId = user.uid;
        console.log(user.uid);
      }
    }
  }

  addToCart(decoration: Decoration) {
    if (this.currentUserId != null) {
      const cartItem = {
        decorationId: decoration.id, // Assuming an 'id' property in Decoration
        userId: this.currentUserId, // Get user ID from AuthService
        name: decoration.name,
        price: decoration.price,
        quantity: 1, // Initial quantity
        image_url: decoration.image_url, // Assuming an 'imageUrl' property exists
      };
      this.cartService
        .isItemInCart(this.currentUserId, decoration.id)
        .then((isInCart) => {
          if (!isInCart) {
            this.cartService
              .addToCart(cartItem)
              .then(() => {
                alert('Decoration added! :)');
                console.log('Decoration added');
              })
              .catch((error) => {
                console.error('Error in adding item to cart', error);
              });
          } else {
            alert('This decoration is already in your cart! :(');
          }
        })
        .catch((error) => {
          console.error('Error in cart check:', error);
        });

      // console.log(cartItem);
    }
  }

  ngOnDestroy(): void {
    this.decorationsSubscription.unsubscribe();
  }
}
