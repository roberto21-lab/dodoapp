import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth, USE_DEVICE_LANGUAGE } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  
  
  
  constructor(public afAuth: AngularFireAuth,  
              private router: Router, 
              private firestore: AngularFirestore) {}

  ngOnInit() {

    // this.afAuth.onAuthStateChanged((user) => {

    //   if (user) {
    //     // User is signed in.
        
        
    //   } else  {
    //     // No user is signed in.
        
    //   }
    //    }  );
  }
  

  async onRegister() {
    const { email,  password } = this.registerForm.value;
    
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(result)
      const idUser = result.user.uid
      console.log(idUser)
      // let idUser = this.firestore.collection('user').doc(result.uid)
      const user: any  = {
        name: this.registerForm.value.name,
        correo: this.registerForm.value.email,
        id: idUser
      }

      this.firestore.collection('user').doc(idUser).set(user).then(()=>{
        console.log('usuario guardado con exito');
      }).catch(error => {} );

      // this.router.navigate(['/dashbor'], {
      //   queryParams: { users: email.password },
        
      // });
      this.router.navigate(['/dashbor']);
    } catch (error) {}

    console.log(this.registerForm.value);
  }
  

  
}
