import { Injectable } from '@angular/core';
import {Deck} from '../../Model/deck';
import {Card} from '../../Model/card';
import {CardService} from './card.service';
import {CardMatch} from '../../Model/card-match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // Cards
  public myDeck: CardMatch[];
  public opponentDeck: CardMatch[];
  public myCardsOnBattlefield: CardMatch[];
  public opponentCardsOnBattlefield: CardMatch[];

  // Cards for actions
  public selectedCardForAttack: CardMatch;
  public selectedCardForDefense: CardMatch;
  public selectedCardToPutOnBattlefield: CardMatch;

  // Game State
  public playedCardThisTurn: Boolean;
  public myTurn: Boolean;
  public firstTurn: Boolean;
  public textArea: string;
  public gameOver: Boolean;
  public playerWin: Boolean;

  constructor(public serviceCard: CardService) {
  }

  setDeckForMatch(deck: CardMatch[]) {
    this.myDeck = deck;
  }

  public startMatch() {
    this.myCardsOnBattlefield = [];
    this.opponentCardsOnBattlefield = [];
    this.playedCardThisTurn = false;
    this.firstTurn = true;
    this.gameOver = false;
    this.playerWin = false;
    this.textArea = '';

    // AI DECK
    this.opponentDeck = [];
    this.serviceCard.getCards().subscribe(r => {
      let cards = r;
      let indexes = [];
      // genere un deck de 5 carte random pour le ai.
      for (let i = 0; i < 5; i++) {
        let rand = Math.floor(Math.random() * cards.length);
        while (indexes.includes(rand)) {
          rand = Math.floor(Math.random() * cards.length);
        }
        indexes[i] = rand;
      }
      // ajouter les cartes random au deck ai
      let cardsToCardMatch = [];
      for (let i = 0; i < indexes.length; i++) {
        cardsToCardMatch[i] = cards[indexes[i]];
      }
      this.opponentDeck = this.serviceCard.convertCardsToCardMatch(cardsToCardMatch);

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
      let c = this.selectedCardToPutOnBattlefield;
      this.textArea = this.textArea.concat('You played ' + c.name + '(' + c.attack + '/' + c.defense + ')' + '\n');

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
    if (this.selectedCardForAttack.attackedThisTurn) {
      return;
    }

    this.textArea = this.textArea.concat(this.selectedCardForAttack.name + ' Attacked ' + this.selectedCardForDefense.name + '\n');
    // deduct defense points equivalent to attack on each card
    this.selectedCardForAttack.defense = this.selectedCardForAttack.defense - this.selectedCardForDefense.attack;
    this.selectedCardForDefense.defense = this.selectedCardForDefense.defense - this.selectedCardForAttack.attack;

    this.selectedCardForAttack.attackedThisTurn = true;

    if (this.myTurn) {
      // ne pas verifier si cest le tour du ai
      this.checkDeadCards();
    } else {
      this.removeAttackPossibilities();
    }

    this.checkEndGame();
    this.selectedCardForAttack = undefined;
    this.selectedCardForDefense = undefined;
  }


  checkAllCardsAttacked(): Boolean {
    for (let i = 0; i < this.myCardsOnBattlefield.length; i++) {
      if (!this.myCardsOnBattlefield[i].attackedThisTurn) {
        return false;
      }
    }
    return true;
  }

  checkDeadCards() {
    if (this.selectedCardForAttack.defense < 1) {
      this.textArea = this.textArea.concat(this.selectedCardForAttack.name + ' destroyed' + '\n');
      this.myCardsOnBattlefield = arrayRemove(this.myCardsOnBattlefield, this.selectedCardForAttack);
    }

    if (this.selectedCardForDefense.defense < 1) {
      this.textArea = this.textArea.concat(this.selectedCardForDefense.name + ' destroyed' + '\n');
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
    // le premier tour personne ne peut attaquer
    if (this.firstTurn) {
      this.playedCardThisTurn = false;
      this.myTurn = false;
      this.firstTurn = false;
      this.textArea = this.textArea.concat('Ai turn' + '\n');
      this.playAiTurn();
      return;
    }
    // joueur doit attaquer avec toute creature
    if (!this.checkAllCardsAttacked() && this.opponentCardsOnBattlefield.length > 0) {
      return;
    }

    this.myTurn = false;
    this.playedCardThisTurn = false;
    this.textArea = this.textArea.concat('Ai turn' + '\n');
    this.resetCardAttackStates();
    this.playAiTurn();
  }


  public resetCardAttackStates() {
    for (let i = 0; i < this.myCardsOnBattlefield.length; i++) {
      this.myCardsOnBattlefield[i].attackedThisTurn = false;
    }
  }


  public flipCoinToSTart() {
    let i = Math.floor(Math.random() * 2) + 1;
    if (i === 1) {
      this.myTurn = true;
      this.firstTurn = true;
      this.textArea = this.textArea.concat('Your turn' + '\n');

    } else {
      this.textArea = this.textArea.concat('Ai turn' + '\n');
      this.myTurn = false;
      this.firstTurn = false;
      this.playAiTurn();
    }
  }


  public checkEndGame() {
    if (this.myDeck.length === 0 && this.myCardsOnBattlefield.length === 0) {
      this.playerLost();
    }

    if (this.opponentDeck.length === 0 && this.opponentCardsOnBattlefield.length === 0) {
      this.aiLost();
    }
  }

  public playerLost() {
    this.textArea = this.textArea.concat('You lose! ' + '\n');
    this.gameOver = true;
  }

  public  aiLost() {
    this.textArea = this.textArea.concat('You win! ' + '\n');
    this.gameOver = true;
    this.playerWin = true;
  }

  // -------------------- AI Operations ---------------
  public playAiTurn() {
    // Play card from ai deck on battlefield
    this.opponentCardsOnBattlefield.push(this.opponentDeck.pop());
    let c = this.opponentCardsOnBattlefield[this.opponentCardsOnBattlefield.length - 1];
    this.textArea = this.textArea.concat('Ai played ' + c.name + '(' + c.attack + '/' + c.defense + ')' + '\n');


    // verify attack step
    if (this.myCardsOnBattlefield.length > 0) {
      // Generate random attack
      for (let i = 0; i < this.opponentCardsOnBattlefield.length; i++) {
        if (this.myCardsOnBattlefield.length === 0) {
          return;
        }
        let rand = Math.floor(Math.random() * this.myCardsOnBattlefield.length);
        // Attack
        this.selectedCardForAttack = this.opponentCardsOnBattlefield[i];
        this.selectedCardForDefense = this.myCardsOnBattlefield[rand];
        this.attack();
      }
    }
    this.cleanUpAfterAIAttack();
    // turn over
    this.myTurn = true;
    this.textArea = this.textArea.concat('Your turn ' + '\n');
  }

  public removeAttackPossibilities() {
    if (this.selectedCardForDefense.defense < 1) {
      this.textArea = this.textArea.concat(this.selectedCardForDefense.name + ' destroyed' + '\n');
      this.myCardsOnBattlefield = arrayRemove(this.myCardsOnBattlefield, this.selectedCardForDefense);
    }
    function arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele !== value;
      });
    }
  }

  public cleanUpAfterAIAttack() {
    for (let i = 0; i < this.opponentCardsOnBattlefield.length; i++) {
      if (this.opponentCardsOnBattlefield[i].defense < 1) {
        this.textArea = this.textArea.concat(this.opponentCardsOnBattlefield[i].name + ' destroyed' + '\n');
        this.opponentCardsOnBattlefield = arrayRemove(this.opponentCardsOnBattlefield, this.opponentCardsOnBattlefield[i]);
      }
    }
    function arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele !== value;
      });
    }
    this.checkEndGame();
  }

}
