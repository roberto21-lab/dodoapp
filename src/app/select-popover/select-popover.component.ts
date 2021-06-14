import { Component, OnInit, Input } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-popover',
  templateUrl: './select-popover.component.html',
  styleUrls: ['./select-popover.component.scss'],
})
export class SelectPopoverComponent implements OnInit {
  @Input('workSpaceOption') workSpaceOption = false
  constructor( 
    public popover: PopoverController,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    
  }
  selecteOption(id){
    console.log(id)
    this.popover.dismiss(id)
  }
}
