import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showInput : boolean = false;
  search:  any = {};
  newTrue: boolean = true

  @Output()
  propagar = new EventEmitter<any>();
  @Output()
  true = new EventEmitter<boolean>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(this.search.title)
  }

  onPropagar() {
    console.log(this.search)
    this.propagar.emit(this.search);
  }

  verBuscador(){
    console.log('hola robertp')
    this.showInput = true
  }

  showHeader(){
    this.showInput = false
  }

  goToDashbor() {
    console.log('hola brian')
    this.router.navigate(['/dashbor']);
  }


  test($event){
    console.log('$event :', $event, this.search);
   }

   cerrarBuscador(){
     console.log('test1')
     console.log(this.newTrue)
     this.true.emit(this.newTrue);
     this.showInput = false
   }
  

  // changeShowInput(isActive = true) {
  //   this.showInput = isActive;
  // }
  // // changeShowInputCard(isActive = true) {
  // //   this.showInputCard = isActive;
  // // }


}
