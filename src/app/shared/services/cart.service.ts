import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { CartItem } from '../models/CartItem';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsCollection: AngularFirestoreCollection<CartItem>;
  constructor(private angularFirestore: AngularFirestore) {
    this.cartItemsCollection =
      angularFirestore.collection<CartItem>('CartItems');
  }

  addToCart(cartItem: CartItem) {
    cartItem.id = this.angularFirestore.createId();
    return this.cartItemsCollection.doc(cartItem.id).set(cartItem);
  }

  getAll() {
    const user = JSON.parse(
      localStorage.getItem('user') as string
    ) as firebase.default.User;

    const cartItemCollection = this.angularFirestore.collection<CartItem>(
      'CartItems',
      (ref) => ref.where('userId', '==', user.uid)
    );
    return cartItemCollection.valueChanges();
  }

  async isItemInCart(userId: string, decorationId: string): Promise<boolean> {
    const result = await this.cartItemsCollection.ref
      .where('userId', '==', userId)
      .where('decorationId', '==', decorationId)
      .get();
    return result.empty ? false : true;
  }
}
