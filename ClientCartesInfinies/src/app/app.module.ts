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



@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayerComponent,
    StoreComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'SignUp', component: SignUpComponent},
      {path: 'Player', component: PlayerComponent},
      {path: ':player', component: CardComponent}
    ])
  ],
  providers: [CardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
