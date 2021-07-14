import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { by, element } from 'protractor';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  idUser = '';
  profile: any = {};
  showInput: boolean = false;
  newName: any = {};
  imgUrl: any = {};
  imgProfile: any;


  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private storage: AngularFireStorage,
    public loadingController: LoadingController
  ) { }

  async ngOnInit() {
    const respProfile: any = await this.getProfile();
    if (respProfile) {
      // si obtenemos data de la promesa getProfile
      this.profile = { ...respProfile, ...this.profile };
      this.imgProfile = this.profile?.avatar ? this.profile?.avatar : '';
    } else {
      // si no obtenemos data de la promesa getProfile
      this.router.navigate(['/login']);
    }

  }

  async onUpload(e) {

    console.log(this.imgProfile);
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
    await loading.present();

    const id = Math.random().toString(36).substring(2);
    // este creo q es la imagen 
    const file = e.target.files;
    const filePath = `uploads/profiel_${id}.png`;
    this.storage.ref(filePath).put(file[0]).then(async (ref: any) => {
      const imgUrl = await ref.ref.getDownloadURL();
      this.imgProfile = imgUrl;
      this.profile.avatar = imgUrl;
      await this.firestore.collection('user').doc(this.idUser).update({ avatar: imgUrl });
      loading.dismiss()

    }).catch(err => {
      loading.dismiss()
      console.log('err', err)
    });

  }

  uploadImg() {
    console.log('hola')
    var x = document.getElementById("inputfileselect");
    console.log(x)
    x.click()
  }



  getProfile() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          // si hay usuario, guardamos el id del usuario.
          this.idUser = user.uid;
          // obtenemos el documento en firebase con user.uid
          const snapUser: any = await this.firestore
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

  goToDashbor() {
    this.router.navigate(['/dashbor']);
  }

  changeShowInput(isActive = true) {
    this.showInput = isActive;
  }

  sendTofireBaseChangeName(isActive = false) {
    console.log('hola')
    this.firestore.collection('user').doc(this.idUser)
      .update({ name: this.newName.name })
    this.profile = this.newName
    this.showInput = isActive;


  }




}
