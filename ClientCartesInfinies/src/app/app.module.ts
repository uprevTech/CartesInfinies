import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './player/player.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { StoreComponent } from './store/store.component';
import {CardService} from './service/card.service';
import {UserService} from './service/user.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import { MyDecksComponent } from './my-decks/my-decks.component';
import { DeckCreationComponent } from './deck-creation/deck-creation.component';



@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayerComponent,
    StoreComponent,
    LoginComponent,
    SignUpComponent,
    MyDecksComponent,
    DeckCreationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'SignUp', component: SignUpComponent},
      {path: 'MyDecks', component: MyDecksComponent},
      {path: 'DeckCreation', component: DeckCreationComponent},
      {path: 'Player', component: PlayerComponent},
      {path: ':player', component: CardComponent}
    ])
  ],
  providers: [CardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
