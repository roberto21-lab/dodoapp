import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SelectPopoverComponent } from '../select-popover/select-popover.component';

import { TableroPage } from './tablero.page';

const routes: Routes = [
  {
    path: '',
    component: TableroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    IonicModule

  ],
  exports: [RouterModule],
  
})

export class TableroPageRoutingModule {}
