import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './player/player.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: PlayerComponent},
      {path: ':player', component: CardComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
