import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: []
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(public auth: AngularFireAuth) { }

  async ngOnInit() {
    const { email , password } = this.loginForm.value;
   try {
    const result = await this.auth.signInWithEmailAndPassword(email, password)
    
    
    console.log(result)
   } catch (error) {
     console.log(error)
   }

  }
 
    onlogin(){
      
      
    }

    
    
}
  