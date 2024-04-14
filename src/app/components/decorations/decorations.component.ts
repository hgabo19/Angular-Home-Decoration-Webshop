import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Decoration } from 'src/app/shared/models/Decoration';
import { User } from 'src/app/shared/models/User';
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
  constructor(private decorationService: DecorationService) {}

  ngOnInit(): void {
    this.decorationsSubscription = this.decorationService
      .getDecorations()
      .subscribe((data) => {
        this.decorations = data;
        console.log(this.decorations);
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

  ngOnDestroy(): void {
    this.decorationsSubscription.unsubscribe();
  }
}
