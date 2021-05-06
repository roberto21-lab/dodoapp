import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashbor',
  templateUrl: './dashbor.page.html',
  styleUrls: ['./dashbor.page.scss'],
})
export class DashborPage implements OnInit {
  
  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {

      if (user) {
        // User is signed in.
        console.log(user)
      } else {
        // No user is signed in.
        this.router.navigate(['/login']);
      }
    });
  }
  async logOut() {
   try {
     await this.auth.signOut();
     this.router.navigate(['/login']);
   } catch(err) {
     console.log('error', err)
   }
  }
}
