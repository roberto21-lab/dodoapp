import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Moment } from 'moment';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.page.html',
  styleUrls: ['./tablero.page.scss'],
})
export class TableroPage implements OnInit {
  id = '';
  showInputCard: boolean = false;
  shwoModalTarjeta: boolean = false;
  showInput: boolean = false;
  optionsSlide: any = {
    slidesPerView: 1.5,
  };
  idUser = '';
  idColumn = '';
  columns: any = [];
  newColumn: any = {};
  profile: any = null;
  newCard: any = {};
  tarjetas: any = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public modalController: ModalController
  ) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    const respProfile = await this.getProfile();
    if (respProfile) {
      // si obtenemos data de la promesa getProfile
      this.profile = respProfile;
    } else {
      // si no obtenemos data de la promesa getProfile
      this.router.navigate(['/login']);
    }
    console.log(this.profile);
    this.getColumnsToFireStore();
    this.getCardToFireStore();
  }

  goToDashbor() {
    this.router.navigate(['/dashbor']);
  }

  changeShowInput(isActive = true) {
    this.showInput = isActive;
  }
  changeShowInputCard(isActive = true) {
    this.showInputCard = isActive;
  }
  async sendTofireStoreColumn() {
    const idColumn = this.firestore
      .collection('tableros')
      .doc(this.id)
      .collection('columns')
      .doc().ref.id;
    const columnData: any = {
      name: this.newColumn.name,
      id: idColumn,
      tabletId: this.id,
      timestamp: moment().unix(),
    };
    await this.firestore
      .collection('tableros')
      .doc(this.id)
      .collection('columns')
      .doc(idColumn)
      .set(columnData);
    console.log(columnData);
    this.showInput = false
  }

  
  getProfile() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          // si hay usuario, guardamos el id del usuario.
          this.idUser = user.uid;
          // obtenemos el documento en firebase con user.uid
          const snapUser = await this.firestore
            .collection('user')
            .doc(user.uid)
            .get()
            .toPromise();
          // resolvemos la promesa con la data del documento obtenido
          resolve(snapUser.data());
        } else {
          // no hay usuario resolvemos la promesa como falsa.
          resolve(false);
        }
      });
    });
  }

 

  async getColumnsToFireStore() {
    this.columns = this.firestore
      .collection('tableros')
      .doc(this.id)
      .collection('columns')
      .valueChanges()
      .subscribe((columns) => {
        this.columns = columns;
        console.log(this.columns);
      });


  }

  delete(id) {
    this.firestore
      .collection('tableros')
      .doc(this.id)
      .collection('columns')
      .doc(id)
      .delete();
  }

  editColumns(index) {
    this.columns[index].edit = true;
  }
  closeEdit(index) {
    this.columns[index].edit = false;
  }
  async updateElement(id, i) {
    const data = {
      name: this.columns[i].name,
    };
    console.log(data);
    await this.firestore
      .collection('tableros')
      .doc(this.id)
      .collection('columns')
      .doc(id)
      .update(data);

    this.closeEdit(i);
  }
  //tarjeta  

  async sendTofireStoreCard() {
    const idCard = this.firestore
      .collection('tableros')
      .doc(this.id)
      .collection('card')
      .doc().ref.id;
    const cardData: any = {
      name: this.newCard.name,
      id: idCard,
      timestamp: moment().unix(),
    };
    await this.firestore
      .collection('tableros')
      .doc(this.id)
      .collection('card')
      .doc(idCard)
      .set(cardData);
    console.log(cardData);
  }

  async getCardToFireStore() {
    this.firestore
      .collection('tableros')
      .doc(this.id)
      .collection('tarjetas')
      .valueChanges()
      .subscribe((tarjetas) => {
        this.tarjetas = tarjetas;
        console.log(this.tarjetas);
      });
  }

  deleteTarjeta(id) {
    this.firestore
      .collection('tableros')
      .doc(this.id)
      .collection('tarjetas')
      .doc(id)
      .delete();
  }

  async openModalTarjeta(idColumn) {
    this.shwoModalTarjeta = true;
    const modal = await this.modalController.create({
      component: TarjetaComponent,
      cssClass: 'modal-create-tarjeta',
      showBackdrop: false,
      componentProps: { idTablet: this.id, idColumn, onBooard: true, isEdit: false },

    });
    await modal.present();
    await modal.onDidDismiss();
    this.shwoModalTarjeta = false;
  }

  async updateCard(idCard) {
    this.shwoModalTarjeta = true;
    const modal = await this.modalController.create({
      component: TarjetaComponent,
      cssClass: 'modal-create-tarjeta',
      showBackdrop: false,
      componentProps: { idTablet: this.id, idCard, onBooard: true, isEdit: false },

    });
   
    await modal.present();
    await modal.onDidDismiss();
    this.shwoModalTarjeta = false;
  }





}
