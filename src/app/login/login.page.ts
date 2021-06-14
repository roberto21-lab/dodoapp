import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {

      if (user) {
        // User is signed in.
        this.router.navigate(['/dashbor']);
      } else {
        // No user is signed in.
        
      }
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
