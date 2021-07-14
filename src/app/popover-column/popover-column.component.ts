import { Component, OnInit, Input } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-popover-column',
  templateUrl: './popover-column.component.html',
  styleUrls: ['./popover-column.component.scss'],
})
export class PopoverColumnComponent implements OnInit {
  @Input('workSpaceOptionColumn') workSpaceOptionColumn = false


  constructor(
    public popover: PopoverController,
    public modalController: ModalController,
  ) { }

  ngOnInit() {}

  selecteOption(id){
    console.log(id)
    this.popover.dismiss(id)
  }
}
