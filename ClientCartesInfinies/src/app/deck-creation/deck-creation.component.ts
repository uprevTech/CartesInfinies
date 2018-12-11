import { Component, OnInit } from '@angular/core';
import {Card} from '../../Model/card';
import {CardService} from '../service/card.service';
import {Deck} from '../../Model/deck';
import {CreateDeckDTO} from '../../Model/DTO/create-deck-dto';

@Component({
  selector: 'app-deck-creation',
  templateUrl: './deck-creation.component.html',
  styleUrls: ['./deck-creation.component.css']
})
export class DeckCreationComponent implements OnInit {

  constructor(public cardService: CardService) {
    this.cards = new Array<Card>();
  }
  name: string;
  cards: Array<Card>;
  allCards: Card[];

  ngOnInit() {
    this.cardService.getCards().subscribe(r => this.allCards = r);
  }

  createDeck() {
    let deckToCreate = new CreateDeckDTO(this.name, this.cards);
    console.log(deckToCreate)
    this.cardService.createDeck(deckToCreate);
  }

  addCardToDeck(card: Card) {
    let wasInDeck = false;
    for (let currentCard in this.cards) {
      if (currentCard.name === card.name) {
        this.cards.splice(this.cards.indexOf(card), 1);
        wasInDeck = true;
      }
    }
    if (wasInDeck === false) {
      this.cards.push(card);
      console.log(this.cards);
    }
  }
}
