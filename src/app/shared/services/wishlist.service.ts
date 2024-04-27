import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { WishlistItem } from '../models/WishlistItem';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistCollection: AngularFirestoreCollection<WishlistItem>;
  constructor(private angularFirestore: AngularFirestore) {
    this.wishlistCollection =
      angularFirestore.collection<WishlistItem>('WishlistItems');
  }

  addToWishlist(wishlistItem: WishlistItem) {
    wishlistItem.id = this.angularFirestore.createId();
    console.log(wishlistItem);
    return this.angularFirestore
      .collection<WishlistItem>('WishlistItems')
      .doc(wishlistItem.id)
      .set(wishlistItem);
  }

  getAll() {
    const user = JSON.parse(
      localStorage.getItem('user') as string
    ) as firebase.default.User;

    const wishlistCollection = this.angularFirestore.collection<WishlistItem>(
      'WishlistItems',
      (ref) => ref.where('userId', '==', user.uid)
    );
    return wishlistCollection.valueChanges();
  }

  delete(itemId: string): Promise<void> {
    return this.angularFirestore
      .collection<WishlistItem>('WishlistItems')
      .doc(itemId)
      .delete();
  }

  async isItemInWishlist(decorationId: string): Promise<boolean> {
    const user = JSON.parse(
      localStorage.getItem('user') as string
    ) as firebase.default.User;

    const result = await this.wishlistCollection.ref
      .where('userId', '==', user.uid)
      .where('decorationId', '==', decorationId)
      .get();

    return result.empty ? false : true;
  }
}
