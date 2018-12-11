import { Component, OnInit } from '@angular/core';
import {CardService} from '../service/card.service';
import {Deck} from '../../Model/deck';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.css']
})
export class MyDecksComponent implements OnInit {

  constructor(public cardService: CardService) { }

  myDecks: Deck[];

  ngOnInit() {
    this.cardService.getDecks().subscribe(r => this.myDecks = r);
  }

}
