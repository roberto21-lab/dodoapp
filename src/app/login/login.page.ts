import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  profile: any = null;
  
  idUser: string;
  constructor(public auth: AngularFireAuth,
    private firestore: AngularFirestore,
     private router: Router) {}

// si el usuariio es null es q no hay usuario conectado si no tengo usuarios conectados no deberia de mostrar el tab bar pero el problema esta en q el tabbar esta   en el 
// AppComponent.html ... debo preguntar si el usuario esta logeado en el appcomponent para poder hacer un if desde ese lugar o en cada pag ? 


  async ngOnInit() {
    // this.auth.onAuthStateChanged((user) => {

    //   if (user) {
    //     // User is signed in.
    //     this.router.navigate(['/dashbor']);
    //   } else {
    //     // No user is signed in.
        
    //   }
    // });

    // const respProfile = await this.getProfile();
    // if (respProfile) {
    //   // si obtenemos data de la promesa getProfile
    //   this.profile = respProfile;
    // } else {
    //   // si no obtenemos data de la promesa getProfile
    //   this.router.navigate(['/login']);
    // }
    // console.log(this.profile)
    
    
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

  async onLogin() {
    const { email, password } = this.loginForm.value;
    console.log(this.loginForm.value)
    try {
      const user = await this.auth.signInWithEmailAndPassword(email, password);
      
      this.router.navigate(['/dashbor']);
    } catch (error) {
      
    }
  }
}
