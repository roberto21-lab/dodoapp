import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashborPage } from './dashbor.page';

const routes: Routes = [
  {
    path: '',
    component: DashborPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashborPageRoutingModule {}
