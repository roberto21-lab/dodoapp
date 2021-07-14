import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableroPageRoutingModule } from './tablero-routing.module';

import { TableroPage } from './tablero.page';
import { AngularDraggableModule } from 'angular2-draggable';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { PopoverColumnComponent } from '../popover-column/popover-column.component';



@NgModule({
  imports: [
    CommonModule,
    AngularDraggableModule,
    FormsModule,
    IonicModule,
    DragDropModule,
    TableroPageRoutingModule
  ],
  declarations: [TableroPage, PopoverColumnComponent]
})
export class TableroPageModule {}
