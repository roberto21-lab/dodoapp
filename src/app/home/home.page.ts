import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.item()
    // this.auth.onAuthStateChanged((user) => {

    //   if (user) {
    //     // User is signed in.
    //     this.router.navigate(['/dashbor']);
    //   } else {
    //     // No user is signed in.
    //     this.router.navigate(['/login']);
    //   }
    // }
    // );
  }

  SaveLs() {
    // let getOnboarding: string = '[' + localStorage.getItem('items') + ']';
    localStorage.setItem('onboarding', 'true');
    this.router.navigate(['/login']);
  }

  SaveLsRegistro() {
    // let getOnboarding: string = '[' + localStorage.getItem('items') + ']';
    localStorage.setItem('onboarding', 'true');
    this.router.navigate(['/registro']);
  }
  item(){
    const getOnBoarding = localStorage.getItem("onboarding")
    console.log(getOnBoarding)
    if(getOnBoarding){
      this.router.navigate(['/login']);
    }
  }
}
