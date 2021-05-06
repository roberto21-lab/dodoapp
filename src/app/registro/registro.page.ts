import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';


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
  constructor(public afAuth: AngularFireAuth) {}

  ngOnInit() {
    
  }

  async onRegister() {
    const { email, password } = this.registerForm.value;
    
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

    } catch (error) {}

    console.log(this.registerForm.value);
  }

  
  
}
