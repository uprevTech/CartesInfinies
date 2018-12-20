import { Component, OnInit } from '@angular/core';
import {CardService} from '../service/card.service';
import {Deck} from '../../Model/deck';
import {Router} from '@angular/router';
import {MatchService} from '../service/match.service';

@Component({
  selector: 'app-deck-picker',
  templateUrl: './deck-picker.component.html',
  styleUrls: ['./deck-picker.component.css']
})
export class DeckPickerComponent implements OnInit {

  constructor(public serviceCarte: CardService, public router: Router, public serviceMatch: MatchService) { }

  myDecks: Deck[];

  ngOnInit() {
    this.serviceCarte.getDecks().subscribe(r => this.myDecks = r);
  }

  chooseDeck(deck: Deck) {
    let cards = this.serviceCarte.convertCardsToCardMatch(deck.cards);
    this.serviceMatch.setDeckForMatch(cards);
    this.router.navigate(['Match']);
  }
}
