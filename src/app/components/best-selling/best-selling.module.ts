import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BestSellingRoutingModule } from './best-selling-routing.module';
import { BestSellingComponent } from './best-selling.component';

@NgModule({
  declarations: [BestSellingComponent],
  imports: [CommonModule, BestSellingRoutingModule],
})
export class BestSellingModule {}
