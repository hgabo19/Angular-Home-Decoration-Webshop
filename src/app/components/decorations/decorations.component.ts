import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderByDirection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Decoration } from 'src/app/shared/models/Decoration';
import { User } from 'src/app/shared/models/User';
import { WishlistItem } from 'src/app/shared/models/WishlistItem';
import { CartService } from 'src/app/shared/services/cart.service';
import { DecorationService } from 'src/app/shared/services/decoration.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-decorations',
  templateUrl: './decorations.component.html',
  styleUrls: ['./decorations.component.scss'],
})
export class DecorationsComponent implements OnInit, OnDestroy {
  private decorationsSubscription: Subscription = new Subscription();
  decorations: Decoration[] = [];
  currentUserId: string = '';
  sortOrder: OrderByDirection = 'asc';
  sortField: string = 'price';
  constructor(
    private decorationService: DecorationService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.decorationsSubscription = this.decorationService
      .getDecorations(this.sortOrder, this.sortField)
      .subscribe((data) => {
        this.decorations = data;
      });
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Parse the stored string back into a JavaScript object
      const user = JSON.parse(storedUser);
      if (user && user.uid) {
        this.currentUserId = user.uid;
      }
    }
  }

  onSortChange() {
    this.decorationService
      .getDecorations(this.sortOrder, this.sortField)
      .subscribe((data) => {
        this.decorations = data;
      });
  }

  addToWishlist(decoration: Decoration) {
    if (this.currentUserId != null) {
      const date = new Date();
      const wishListItem = {
        userId: this.currentUserId,
        decorationId: decoration.id,
        name: decoration.name,
        date: date,
        price: decoration.price,
      };
      this.wishlistService
        .isItemInWishlist(decoration.id as string)
        .then((isAdded) => {
          if (!isAdded) {
            this.wishlistService
              .addToWishlist(wishListItem)
              .then(() => {
                alert('Added to Wishlist!');
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            alert("You've already added this item to your wishlist!");
          }
        })
        .catch((error) => {
          console.error(error);
        });
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
                alert('Decoration added to cart!');
              })
              .catch((error) => {
                console.error('Error in adding item to cart', error);
              });
          } else {
            alert('This decoration is already in your cart!');
          }
        })
        .catch((error) => {
          console.error('Error in cart check:', error);
        });
    }
  }

  ngOnDestroy(): void {
    this.decorationsSubscription.unsubscribe();
  }
}
