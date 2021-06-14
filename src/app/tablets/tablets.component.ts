import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { SelectPopoverComponent } from '../select-popover/select-popover.component';

@Component({
  selector: 'app-tablets',
  templateUrl: './tablets.component.html',
  styleUrls: ['./tablets.component.scss'],
})
export class TabletsComponent implements OnInit {
  @Input('data') data;
  @Input('isEdit') isEdit;
  tabletForm = new FormGroup({
    title: new FormControl(''),
    workSpace: new FormControl(''),
    Privacy: new FormControl(''),
  });
  constructor(
    public modalController: ModalController,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    console.log(this.isEdit)
    if (this.isEdit) {
      this.tabletForm.patchValue({
        title: this.data.titulo,
        
      });

      console.log('asdfasdfadsfasdfasdfasdfas0', this.data);
      console.log('asdfasdfadsfasdfasdfasdfas0', this.data.titulo);
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async sendToFireStore(id) {
    console.log(this.isEdit, this.tabletForm);
    if (this.isEdit) {
      this.firestore
        .collection('tableros')
        .doc(this.data.id)
        .update({ titulo: this.tabletForm.value.title,
          Privacy: this.tabletForm.value.Privacy,
          workSpace: this.tabletForm.value.workSpace })
        .then(() => {
          this.modalController.dismiss();
        });
    } else {
      const result = await this.afAuth.currentUser;
      const idUser = result.uid;
      const idTableros = this.firestore.collection('tableros').doc().ref.id;
      const tableros: any = {
        titulo: this.tabletForm.value.title,
        workSpace: this.tabletForm.value.workSpace,
        Privacy: this.tabletForm.value.Privacy,
        users: [idUser],
        id: idTableros,
      };
      this.firestore
        .collection('tableros')
        .doc(idTableros)
        .set(tableros)
        .then(() => {
          this.modalController.dismiss();
        });
    }
  }
  
  async openPopover(event, workSpaceOption) {
    const popover = await this.popoverController.create({
      component: SelectPopoverComponent,
      cssClass: 'my-popover-class',
      event,
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        workSpaceOption,
      },
    });
    await popover.present();
    const { data }: any = await popover.onDidDismiss();
    if(workSpaceOption){
      this.tabletForm.patchValue({ workSpace: data });
    }else{
      this.tabletForm.patchValue({ Privacy: data });
    }
    console.log(data)
    // console.log('dasddasdasdadas' data.valor1)
  }


}
