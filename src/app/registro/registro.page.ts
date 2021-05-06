import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


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
  constructor(public afAuth: AngularFireAuth,  private router: Router) {}

  ngOnInit() {

    this.afAuth.onAuthStateChanged((user) => {

      if (user) {
        // User is signed in.
        this.router.navigate(['/dashbor']);
        
      } else  {
        // No user is signed in.
        
      }
    });

    // var user = this.afAuth.currentUser;
    

    // if (user) {
    //   // User is signed in.
    //   console.log(user)

    // } else {
    //   // No user is signed in.
    // }
    
    
  }
  

  async onRegister() {
    const { email, password } = this.registerForm.value;
    
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.router.navigate(['/dashbor'], {
        queryParams: { users: email.password },
        
      });
      
    } catch (error) {}

    console.log(this.registerForm.value);
  }

  
  
}
