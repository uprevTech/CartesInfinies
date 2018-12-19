import { Injectable } from '@angular/core';
import {Deck} from '../../Model/deck';
import {Card} from '../../Model/card';
import {CardService} from './card.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // Cards
  public myDeck: Card[];
  public opponentDeck: Card[];
  public myCardsOnBattlefield: Card[];
  public opponentCardsOnBattlefield: Card[];

  // Cards for actions
  public selectedCardForAttack: Card;
  public selectedCardForDefense: Card;
  public selectedCardToPutOnBattlefield: Card;

  // Game State
  public playedCardThisTurn: Boolean;
  public attackedWithAll: Boolean;

  constructor(public serviceCard: CardService) {
  }

  setDeckForMatch(deck: Card[]) {
    this.myDeck = deck;
  }

  public startMatch() {
    this.myCardsOnBattlefield = [];
    this.opponentCardsOnBattlefield = [];
    this.attackedWithAll = false;
    this.playedCardThisTurn = false;

    // AI DECK
    this.opponentDeck = [];
    this.serviceCard.getCards().subscribe(r => {
      let cards = r;
      let indexes = [];
      // genere un deck de 4 carte random pour le ai.
      for (let i = 0; i < 4; i++) {
        let rand = Math.floor(Math.random() * cards.length) + 1;
        while (indexes.includes(rand)) {
          rand = Math.floor(Math.random() * cards.length) + 1;
        }
        indexes[i] = rand;
      }
      // ajouter les cartes random au deck ai
      for (let i = 0; i < indexes.length; i++) {
        this.opponentDeck[i] = cards[indexes[i]];
      }
    });
  }

  public playCard() {
    if (this.selectedCardToPutOnBattlefield != null) {
      // put card ont battlefield
      this.myCardsOnBattlefield.push(this.selectedCardToPutOnBattlefield);

      // remove card from hand
      this.myDeck = arrayRemove(this.myDeck, this.selectedCardToPutOnBattlefield);
      this.selectedCardToPutOnBattlefield = null;

      this.playedCardThisTurn = true;
    }
    function arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele !== value;
      });
    }
  }

  public endTurn() {
    this.playedCardThisTurn = false;
    this.attackedWithAll = false;
  }
}
