import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Decoration } from '../models/Decoration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DecorationService {
  private decorationsCollection: AngularFirestoreCollection<Decoration>;

  constructor(
    private angularFirestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {
    this.decorationsCollection =
      angularFirestore.collection<Decoration>('Decorations');
  }

  getDecorations(): Observable<Decoration[]> {
    return this.decorationsCollection.valueChanges();
  }

  // loadAllImages(image_url: string) {
  //   return this.fireStorage.ref(image_url).getDownloadURL();
  // }
}
