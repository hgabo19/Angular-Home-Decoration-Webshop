import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WishlistComponent, DateFormatPipe],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    MatExpansionModule,
    MatButtonModule,
  ],
})
export class WishlistModule {}
