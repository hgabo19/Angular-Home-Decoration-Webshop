import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecorationsComponent } from './decorations.component';

const routes: Routes = [{ path: '', component: DecorationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecorationsRoutingModule {}
