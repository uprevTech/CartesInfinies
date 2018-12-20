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
    if (this.cards.length === 5) {
      let deckToCreate = new CreateDeckDTO(this.name, this.cards);
      this.cardService.createDeck(deckToCreate);
      this.router.navigate(['MyDecks']);
    } else {
      alert ('Decks must contain exactly 5 cards in order for them to be valid');
    }
  }

  addCardToDeck(card: Card) {
    let wasInDeck = false;
    for (let index = 0; index < this.cards.length; index++) {
      if (this.cards[index].name === card.name) {
        this.cards = arrayRemove(this.cards, card);
        console.log(this.cards);
        wasInDeck = true;
      }
    }
    if (this.cards.length >= 5) {
      alert('Unable to add a new card: Decks can only contain 5 cards');
    } else if (wasInDeck === false && this.cards.length < 5) {
      this.cards.push(card);
      console.log(this.cards);
    }

    function arrayRemove(arr, value) {

      return arr.filter(function(ele) {
        return ele !== value;
      });
    }
  }
}
