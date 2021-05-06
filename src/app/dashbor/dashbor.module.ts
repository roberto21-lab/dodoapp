import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashborPageRoutingModule } from './dashbor-routing.module';

import { DashborPage } from './dashbor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashborPageRoutingModule
  ],
  declarations: [DashborPage]
})
export class DashborPageModule {}
