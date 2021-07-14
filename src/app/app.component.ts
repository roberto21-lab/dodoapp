import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  items: Observable<unknown[]>;
  idUser = '';
  profile: any = null;
  shwoTabs: boolean = false;
  constructor(
    private router: Router,
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
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
    // if (this.profile == null) {
    //   this.shwoTabs = false
    // } else {
    //   this.shwoTabs = true
    // }

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
          this.shwoTabs = true
          // resolvemos la promesa con la data del documento obtenido
          resolve(snapUser.data());
        } else {
          this.shwoTabs = false
          // no hay usuario resolvemos la promesa como falsa.
          resolve(false);
        }
      });
    });
  }

}
