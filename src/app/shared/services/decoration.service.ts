import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Decoration } from '../models/Decoration';
import { Observable } from 'rxjs';
import { OrderByDirection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DecorationService {
  constructor(private angularFirestore: AngularFirestore) {}

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
