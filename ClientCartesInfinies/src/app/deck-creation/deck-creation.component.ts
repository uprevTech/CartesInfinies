import { Component, OnInit } from '@angular/core';
import {Card} from '../../Model/card';
import {CardService} from '../service/card.service';
import {Deck} from '../../Model/deck';
import {CreateDeckDTO} from '../../Model/DTO/create-deck-dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deck-creation',
  templateUrl: './deck-creation.component.html',
  styleUrls: ['./deck-creation.component.css']
})
export class DeckCreationComponent implements OnInit {

  constructor(public cardService: CardService, public router: Router) {
    this.cards = [];
  }
  name: string;
  cards: Card[];
  allCards: Card[];

  ngOnInit() {
    this.cardService.getCards().subscribe(r => this.allCards = r);
  }

  createDeck() {
    let deckToCreate = new CreateDeckDTO(this.name, this.cards);
    this.cardService.createDeck(deckToCreate);
    this.router.navigate(['MyDecks']);
  }

  addCardToDeck(card: Card) {
    let wasInDeck = false;
    for (let index = 0; index < this.cards.length; index++) {
      if (this.cards[index].name === card.name) {
        this.cards = arrayRemove(this.cards, card);
        wasInDeck = true;
      }
    }
    if (wasInDeck === false) {
      this.cards.push(card);
    }

    function arrayRemove(arr, value) {

      return arr.filter(function(ele) {
        return ele !== value;
      });
    }
  }
}
