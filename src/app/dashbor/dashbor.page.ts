import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

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
  aaa: any = '';
  tableros: any = [];
  tablerosAuxiliar: any = [];
  idUser = '';
  profile: any = null;
  search: any;
  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private sanitizer: DomSanitizer,
    public modalController: ModalController ,
    public popoverController: PopoverController
  ) { }

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
  procesaPropagar({title}) {
    console.log('event en padre, title', title , true);
    const result = this.tablerosAuxiliar.filter(tablero => tablero.titulo.toLowerCase().includes(title.toLowerCase()));
    console.log(result)
    this.tableros = result

  }

  truePropagar(evento){
    console.log('aki mostrar todos los tableros', evento)
    this.tableros = this.tablerosAuxiliar
    console.log(this.tableros)
    
  }

  stop(event) {
    event.stopPropagation();
  }
  hola(ev) {
    this.aaa = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(ev.target.files[0]))
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
  async openPopoverTarjeta() {
    const popover = await this.popoverController.create({
      component: TarjetaComponent,
      cssClass: 'wsasaksas',

      componentProps: { data: this.tableros, isEdit: false },
    });

    await popover.present();
    await popover.onDidDismiss();
  }

  async getTablerosFireStore() {

    this.firestore
      .collection('tableros', (ref) =>
        ref.where('users', 'array-contains', this.idUser)
      )
      .valueChanges()
      .subscribe((tableros) => {
        this.tableros = tableros;
        this.tablerosAuxiliar = tableros
        console.log(this.tableros)

      });

  }

  eliminarTableros(id) {
    console.log()
    this.firestore.collection('tableros').doc(id).delete();
    console.log('eliminando tablero', this.tableros);
  }

  async update(data) {
    this.shwoModal = true;
    const modal = await this.modalController.create({
      component: TabletsComponent,
      cssClass: 'modal-create',
      // showBackdrop: false,
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: { data, isEdit: true },
    });

    await modal.present();
    await modal.onDidDismiss();
    this.shwoModal = false;
  }

  // async openModal() {
  //   this.shwoModal = true;
  //   const modal = await this.modalController.create({
  //     component: TabletsComponent,
  //     cssClass: 'modal-create',
  //     showBackdrop: false,
  //   });
  //   await modal.present();
  //   await modal.onDidDismiss();
  //   this.shwoModal = false;
  // }

  goTablero(id) {
    this.router.navigate(['tablero', id]);
  }
}

