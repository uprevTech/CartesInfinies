import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../service/card.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(public cardService: CardService, public userService: UserService) { }

  ngOnInit() {
    this.cardService.createStarterDeck();
  }

  signOut() {
    this.userService.signout();
  }

}
