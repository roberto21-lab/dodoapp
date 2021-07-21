import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { by, element } from 'protractor';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  idUser = '';
  previewImg: any = '';
  profile: any = {};
  showInput: boolean = false;
  newName: any = {};
  imgUrl: any = {};
  imgProfile: any;
  imgnew: any;
  showImgNew: boolean;
  fileImg: any = '';
  btnSaveImg: boolean = false
  

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    public sanitizer: DomSanitizer
  ) { }

  async ngOnInit() {

    const respProfile: any = await this.getProfile();
    console.log(respProfile)
    if (respProfile) {
      
      // si obtenemos data de la promesa getProfile
      this.profile = { ...respProfile, ...this.profile };
        // ternario un if de 3 lo priemero es la condicion si se cumple la condicion 1 se ejecuta la exprecion1 si no se cumple se ejecuta la exprecion 2..
                          //  condicion             exprecion1           exprecion 2
      this.imgProfile = this.profile?.avatar ? this.profile?.avatar : '';
    } else {
      // si no obtenemos data de la promesa getProfile
      this.router.navigate(['/login']);
    }

  }

  


  async onUpload(e) {
   console.log(this.fileImg)
    console.log(this.imgProfile);
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
    await loading.present();
  
    const id = Math.random().toString(36).substring(2);
    
    const file = this.fileImg
    
  
    const filePath = `uploads/profiel_${id}.png`;
    this.storage.ref(filePath).put(file).then(async (ref: any) => {
      const imgUrl = await ref.ref.getDownloadURL();
      this.previewImg = imgUrl;
      this.profile.avatar = imgUrl;
      await this.firestore.collection('user').doc(this.idUser).update({ avatar: imgUrl });
      this.imgProfile = this.previewImg

      this.previewImg = null;
      loading.dismiss()
      
    }).catch(err => {
      loading.dismiss()
      console.log('err', err)
    });
    this.btnSaveImg = false

    
  }


  sanitize(file) {
    console.log('esto deauqi', file)
    return this.sanitizer.bypassSecurityTrustResourceUrl(file)
  }
  changedPhoto(e) {
    this.btnSaveImg = true
    this.previewImg = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(e.target.files[0]))
    console.log(e.target.files[0])
    this.fileImg = e.target.files[0]
    this.cdr.markForCheck();
    this.cdr.detectChanges();
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
