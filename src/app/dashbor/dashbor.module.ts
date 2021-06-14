import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashborPageRoutingModule } from './dashbor-routing.module';

import { DashborPage } from './dashbor.page';
import { TabletsComponent } from '../tablets/tablets.component'
import { HeaderModule } from '../header/header.module';
import { TabletsModule } from '../tablets/tablets.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DashborPageRoutingModule,
    HeaderModule,
    TabletsModule
    
  ],
  declarations: [DashborPage],
})
export class DashborPageModule {}
