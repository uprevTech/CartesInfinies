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
  public myTurn: Boolean;

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
      this.flipCoinToSTart();
    });
  }

  public playCard() {
    if (!this.myTurn || this.playedCardThisTurn) {
      return;
    }
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

  public attack() {
    if (this.selectedCardForDefense === undefined || this.selectedCardForAttack === undefined) {
      return;
    }
    if (this.selectedCardForDefense === null || this.selectedCardForAttack === null) {
      return;
    }

    // deduct defense points equivalent to attack on each card
    this.selectedCardForAttack.defense = this.selectedCardForAttack.defense - this.selectedCardForDefense.attack;
    this.selectedCardForDefense.defense = this.selectedCardForDefense.defense - this.selectedCardForAttack.attack;

    this.checkDeadCards();
    this.checkAllCardsAttacked();

    this.selectedCardForAttack = undefined;
    this.selectedCardForDefense = undefined;
  }

  checkAllCardsAttacked() {
    if (!this.playedCardThisTurn) {
      return;
    }
    
  }

  checkDeadCards() {
    if (this.selectedCardForAttack.defense < 1) {
      this.myCardsOnBattlefield = arrayRemove(this.myCardsOnBattlefield, this.selectedCardForAttack);
    }

    if (this.selectedCardForDefense.defense < 1) {
      this.opponentCardsOnBattlefield = arrayRemove(this.opponentCardsOnBattlefield, this.selectedCardForDefense);
    }
    function arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele !== value;
      });
    }
  }

  public endTurn() {
    if (!this.myTurn) {
      return;
    }
    this.playedCardThisTurn = false;
    this.attackedWithAll = false;
    this.playAiTurn();
  }



  public flipCoinToSTart() {
    let i = Math.floor(Math.random() * 2) + 1;
    if (i === 1) {
      this.myTurn = true;
      // il n'y aura pas de carte a attaquer au premier tour
      this.attackedWithAll = true;

    } else {
      this.myTurn = false;
      this.playAiTurn();
    }
  }







  // AI Operations
  public playAiTurn() {
    // Play card from ai deck on battlefield
    this.opponentCardsOnBattlefield.push(this.opponentDeck.pop());

    // verify attack step
    if (this.myCardsOnBattlefield.length > 0) {

    }



    this.myTurn = true;
  }
}
