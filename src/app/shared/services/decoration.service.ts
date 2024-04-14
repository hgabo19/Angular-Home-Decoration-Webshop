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
  decorations$: Observable<Decoration[]>;

  constructor(
    private angularFirestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {
    this.decorationsCollection =
      angularFirestore.collection<Decoration>('Decorations');
    this.decorations$ = this.decorationsCollection.valueChanges();
  }

  getDecorations(): Observable<Decoration[]> {
    return this.decorations$;
  }

  // loadAllImages(image_url: string) {
  //   return this.fireStorage.ref(image_url).getDownloadURL();
  // }
}
