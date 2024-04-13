import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestSellingComponent } from './best-selling.component';

const routes: Routes = [{ path: '', component: BestSellingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestSellingRoutingModule {}
