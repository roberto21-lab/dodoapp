import { Component } from '@angular/core';
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
  
  constructor(
    firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(){
   
  }
  
}
