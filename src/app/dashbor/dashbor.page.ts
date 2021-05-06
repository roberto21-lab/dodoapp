import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashbor',
  templateUrl: './dashbor.page.html',
  styleUrls: ['./dashbor.page.scss'],
})
export class DashborPage implements OnInit {

  constructor(public auth : AngularFireAuth) { }

  ngOnInit() {
    
  }
logout(){
  const logout = document.querySelector('#logout')
  logout.addEventListener('click', e =>{
    e.preventDefault();
    this.auth.signOut().then(()=>{
      console.log('sign out')
    })
  } )
}
}
