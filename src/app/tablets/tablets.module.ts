import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelectPopoverComponent } from '../select-popover/select-popover.component';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { TabletsComponent } from './tablets.component';




@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [TabletsComponent, SelectPopoverComponent, TarjetaComponent],
})
export class TabletsModule { }
