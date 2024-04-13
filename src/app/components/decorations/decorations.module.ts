import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecorationsRoutingModule } from './decorations-routing.module';
import { DecorationsComponent } from './decorations.component';

@NgModule({
  declarations: [DecorationsComponent],
  imports: [CommonModule, DecorationsRoutingModule],
})
export class DecorationsModule {}
