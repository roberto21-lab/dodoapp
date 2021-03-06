import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import {DragDropModule} from '@angular/cdk/drag-drop';

import { AngularFireStorageModule } from '@angular/fire/storage';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
     AngularFireModule.initializeApp(environment.firebase),
     AngularFireAnalyticsModule,
    AngularFirestoreModule,
    DragDropModule,
    AngularFireStorageModule,
      AppRoutingModule
     ],  
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy} ],
  bootstrap: [AppComponent],
})
export class AppModule {}
