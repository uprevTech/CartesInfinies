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
import { DeckPickerComponent } from './deck-picker/deck-picker.component';
import { MatchComponent } from './match/match.component';
import {MatchService} from './service/match.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayerComponent,
    StoreComponent,
    LoginComponent,
    SignUpComponent,
    MyDecksComponent,
    DeckCreationComponent,
    DeckPickerComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'SignUp', component: SignUpComponent},
      {path: 'MyDecks', component: MyDecksComponent},
      {path: 'DeckCreation', component: DeckCreationComponent},
      {path: 'DeckPicker', component: DeckPickerComponent},
      {path: 'Match', component: MatchComponent},
      {path: 'Player', component: PlayerComponent},
      {path: ':player', component: CardComponent}
    ])
  ],
  providers: [CardService, UserService, MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
