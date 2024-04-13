import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Decoration } from 'src/app/shared/models/Decoration';
import { DecorationService } from 'src/app/shared/services/decoration.service';

@Component({
  selector: 'app-decorations',
  templateUrl: './decorations.component.html',
  styleUrls: ['./decorations.component.scss'],
})
export class DecorationsComponent implements OnInit, OnDestroy {
  private decorationsSubscription: Subscription = new Subscription();
  decorations: Decoration[] = [];
  constructor(private decorationService: DecorationService) {}

  ngOnInit(): void {
    this.decorationsSubscription = this.decorationService
      .getDecorations()
      .subscribe((data) => {
        this.decorations = data;
        console.log(this.decorations);
      });
  }

  ngOnDestroy(): void {
    this.decorationsSubscription.unsubscribe();
  }
}
