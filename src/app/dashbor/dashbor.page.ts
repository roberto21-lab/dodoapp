import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController, PopoverController } from '@ionic/angular';
//page
import { TabletsComponent } from '../tablets/tablets.component';
//
import { Observable } from 'rxjs';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-dashbor',
  templateUrl: './dashbor.page.html',
  styleUrls: ['./dashbor.page.scss'],
})
export class DashborPage implements OnInit {
  @Input('data') data;
  shwoModal: boolean = false;
  privacy: '';
  tableros: any = [];
  idUser = '';
  profile: any = null;
  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    public modalController: ModalController // public popoverController: PopoverController
  ) {}

  async ngOnInit() {
    const respProfile = await this.getProfile();
    if (respProfile) {
      // si obtenemos data de la promesa getProfile
      this.profile = respProfile;
    } else {
      // si no obtenemos data de la promesa getProfile
      this.router.navigate(['/login']);
    }
    console.log(this.profile)
    this.getTablerosFireStore();
  }
  stop(event) {
    event.stopPropagation();
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

  async logOut() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (err) {
      console.log('error', err);
    }
  }
  async openModal() {
    this.shwoModal = true;
    const modal = await this.modalController.create({
      component: TabletsComponent,
      cssClass: 'modal-create',
      showBackdrop: false,
    });
    await modal.present();
    await modal.onDidDismiss();
    this.shwoModal = false;
  }
  async openModalTarjeta() {
    this.shwoModal = true;
    const modal = await this.modalController.create({
      component: TarjetaComponent,
      cssClass: 'modal-create-tarjeta',
      showBackdrop: false,
      componentProps: { data: this.tableros, isEdit: false },

    });
    await modal.present();
    await modal.onDidDismiss();
    this.shwoModal = false;
  }

  async getTablerosFireStore() {
    
    this.firestore
      .collection('tableros', (ref) =>
        ref.where('users', 'array-contains', this.idUser)
      )
      .valueChanges()
      .subscribe((tableros) => {
        this.tableros = tableros;
        console.log(this.tableros)
        
      });
      
  }
  
  eliminarTableros(id) {
    console.log()
    this.firestore.collection('tableros').doc(id).delete();
    console.log('eliminando tablero', this.tableros);
  }

  async update(data, id) {
    this.shwoModal = true;
    const modal = await this.modalController.create({
      component: TabletsComponent,
      cssClass: 'modal-create',
      showBackdrop: false,
      componentProps: { data, isEdit: true },
    });
   
    await modal.present();
    await modal.onDidDismiss();
    this.shwoModal = false;
  }

  goTablero(id) {
    this.router.navigate(['tablero', id]);
  }
}

