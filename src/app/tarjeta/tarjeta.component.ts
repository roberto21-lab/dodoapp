import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss'],
})
export class TarjetaComponent implements OnInit {
  @Input('data') data: any = [];
  @Input('isEdit') isEdit: any = [];
  @Input('onBooard') onBooard: boolean;
  @Input('idTablet') idTablet: any;
  @Input('idColumn') idColumn: any;



  showCard: boolean = false;


  newCard: any = {};
  id = '';
  idUser: string;
  profile: any;
  colums = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    public modalController: ModalController,
    public popoverController: PopoverController,

    public auth: AngularFireAuth
  ) { }

  async ngOnInit() {
    console.log(this.isEdit, 'holaaaaaaaaa')



    console.log(this.data.name)
    if (this.onBooard) {
      this.newCard.tabletId = this.idTablet;
      this.newCard.columnId = this.idColumn;
    }
    if (this.isEdit) {
      this.newCard.description = this.data.description
      this.newCard.name = this.data.name
    }
    console.log(this.data);
    const respProfile = await this.getProfile();
    if (respProfile) {
      // si obtenemos data de la promesa getProfile
      this.profile = respProfile;
    } else {
      // si no obtenemos data de la promesa getProfile
      this.router.navigate(['/login']);
    }
    // console.log(this.profile);
    // this.getColumnsToFireStore();
  }

  async getColumns(ev) {
    console.log(ev);
    const tabletId = ev.detail.value;
    if (tabletId) {
      const snapColumns = await this.firestore
        .collection('tableros')
        .doc(tabletId)
        .collection('columns')
        .get()
        .toPromise();
      const respColumns: any = [...snapColumns.docs.map((item) => item.data())];
      console.log(respColumns);
      this.colums = respColumns;
    } else {
      this.colums = [];
    }
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

  async sendTofireStoreCard() {
    if (this.isEdit) {
      // this.newCard.description = this.data.description
      //  this.newCard.name = this.data.name
      this.firestore
        .collection('tableros')
        .doc(this.newCard.tabletId)
        .collection('tarjetas')
        .doc(this.data.id)
        .update({
          description: this.newCard.description,
          name: this.newCard.name,
          expireData: this.newCard.expireData,
        });
      this.popoverController.dismiss();

      console.log('hola roberto');
    } else {

      const idCard = this.firestore
        .collection('tableros')
        .doc(this.newCard.tabletId)
        .collection('tarjetas')
        .doc().ref.id;
      console.log(idCard)
      const cardData: any = {
        ...this.newCard,
        timestamp: moment().unix(),
        id: idCard,

      };

      this.popoverController.dismiss();

      console.log(this.idUser);
      await this.firestore
        .collection('tableros')
        .doc(this.newCard.tabletId)
        .collection('tarjetas')
        .doc(idCard)
        .set(cardData);
      console.log(cardData);
    }

  }

  closesTarjetamodal() {
    this.popoverController.dismiss();
  }


}
