import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Decoration } from '../models/Decoration';
import { Observable } from 'rxjs';
import { OrderByDirection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DecorationService {
  constructor(
    private angularFirestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {}

  getDecorations(
    sortOrder: OrderByDirection,
    sortField: string
  ): Observable<Decoration[]> {
    return this.angularFirestore
      .collection<Decoration>('Decorations', (ref) =>
        ref.orderBy(sortField, sortOrder)
      )
      .valueChanges();
  }
}
