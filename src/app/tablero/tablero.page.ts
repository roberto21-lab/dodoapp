import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { Moment } from 'moment';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { PopoverColumnComponent } from '../popover-column/popover-column.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';



// popover-column
@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.page.html',
  styleUrls: ['./tablero.page.scss'],
})
export class TableroPage implements OnInit {
  @Input('isEdit') isEdit;
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
  tableros: any = [];
  movingCard = null;
  movingColumn = null;
  gridSize = 50;
  
  grids = [0, 50, 100, 150, 200];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public modalController: ModalController,
    public popoverController: PopoverController
  ) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    if (this.isEdit) {
      this.columns.patchValue();
      console.log(this.columns)
      // this.getTablerosFireStore();
      // console.log(this.tableros)


    }

  
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
    this.getTablerosFireStore();

  }
  allowDrop(event) {
    event.preventDefault();
  }
  drop(event) {
    console.log(event.target.id, this.movingCard, this.movingColumn)
    console.log(event.target.id)
    if (event.target.id) {
      this.firestore
        .collection('tableros')
        .doc(this.id)
        .collection('tarjetas')
        .doc(this.movingCard)
        .update({
          columnId: event.target.id,
        });
    }

    document.querySelectorAll('.columna').forEach(column => column.classList.remove('drop'));

  }
  drag(e, indexCard, indexColumn) {
    this.movingCard = indexCard;
    console.log(this.newCard)
    this.movingColumn = indexColumn;
    e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
    e.dataTransfer.setData('text/plain', e.currentTarget.dataset.id);
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
        setTimeout(() => {
          const dragEnter = event => {
            event.currentTarget.classList.add('drop');
          };

          const dragLeave = event => {
            event.currentTarget.classList.remove('drop');
          };

          document.querySelectorAll('.columna').forEach(column => {
            column.addEventListener('dragenter', dragEnter);
            column.addEventListener('dragleave', dragLeave);
          });
        }, 1000)
      });


  }

  delete(id) {
    console.log('hola roberto')
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
        setTimeout(() => {
          const dragStart = event => {
            event.currentTarget.classList.add('dragging');
          };

          const dragEnd = event => {
            event.currentTarget.classList.remove('dragging');
          };

          document.querySelectorAll('.card-tarjeta').forEach(card => {
            card.addEventListener('dragstart', dragStart);
            card.addEventListener('dragend', dragEnd);
          });
        }, 1000)

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

  async openPopoverTarjeta(idColumn) {
    this.shwoModalTarjeta = true;
    const popover = await this.popoverController.create({
      component: TarjetaComponent,
      componentProps: { idTablet: this.id, idColumn, onBooard: true, isEdit: false },

    });
    await popover.present();
    await popover.onDidDismiss();
    this.shwoModalTarjeta = false;
  }

  async updateCard(data, idCard) {
    this.shwoModalTarjeta = true;
    const popover = await this.popoverController.create({
      component: TarjetaComponent,
      // backdropDismiss: true,
      cssClass: 'update-card',

      componentProps: { data, idTablet: this.id, idCard, onBooard: true, isEdit: true },

    });

    await popover.present();
    await popover.onDidDismiss();
    // if(onBooard){

    // }
    this.shwoModalTarjeta = false;
  }

  async openPopoverColunm(event, workSpaceOptionColumn, colunmId, indexColumn) {
    console.log("open popover ")
    const popover = await this.popoverController.create({
      component: PopoverColumnComponent,
      cssClass: 'my-popover-column',
      componentProps: {
        workSpaceOptionColumn,
      },
    });
    await popover.present();
    const { data }: any = await popover.onDidDismiss();
    if (workSpaceOptionColumn) {
      this.columns.patchValue({ workSpaceOptionColumn: data });
    } else {
      // this.tabletForm.patchValue({ Privacy: data });
    }
    console.log(data)
    if (data == 4) {
      this.delete(colunmId)
    } else if (data == 5) {
      this.editColumns(indexColumn)
    }
    // console.log('dasddasdasdadas' data.valor1)
  }


  async sendToFireStoreUpdateColunm(id, i) {
    console.log(id, this.columns[i].name)
    if (id && this.columns[i].name) {
      this.firestore.collection('tableros').doc(this.id)
        .collection('columns')
        .doc(id)
        .update({ name: this.columns[i].name })
    }

  }

  async getTablerosFireStore() {
    this.tableros =
      this.firestore.collection('tableros').doc(this.id)
        .valueChanges()
        .subscribe((tableros) => {
          this.tableros = tableros;
          console.log(this.tableros);
        });
    // .ref.id;
    console.log(this.tableros)
    // this.firestore
    //   .collection('tableros', (ref) =>
    //     ref.where('users', 'array-contains', this.idUser)
    //   )
    //   .valueChanges()
    //   .subscribe((tableros) => {
    //     this.tableros = tableros;
    //     console.log(this.tableros)

    //   });

  }


}
