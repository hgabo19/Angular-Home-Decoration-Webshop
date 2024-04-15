import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WishlistItem } from 'src/app/shared/models/WishlistItem';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  providers: [DateFormatPipe],
})
export class WishlistComponent implements OnInit {
  private wishlistSubscription: Subscription = new Subscription();
  wishItems: WishlistItem[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistSubscription = this.wishlistService
      .getAll()
      .subscribe((data) => {
        this.wishItems = data;
      });
  }

  removeItem(item: WishlistItem) {
    this.wishlistService
      .delete(item.id as string)
      .then(() => {
        alert('Item called "' + item.name + '" removed from your wishlist!');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
