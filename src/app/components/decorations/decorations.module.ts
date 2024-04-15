import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecorationsRoutingModule } from './decorations-routing.module';
import { DecorationsComponent } from './decorations.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DecorationsComponent],
  imports: [CommonModule, DecorationsRoutingModule, FormsModule, MatIconModule],
})
export class DecorationsModule {}
