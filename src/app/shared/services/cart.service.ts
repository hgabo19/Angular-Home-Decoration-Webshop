import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private angularFirestore: AngularFirestore) {}

  saveDecorationToCart(cartItem: CartItem, userId: string) {}
}
