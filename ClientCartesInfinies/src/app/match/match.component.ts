import { Component, OnInit } from '@angular/core';
import {Deck} from '../../Model/deck';
import {CardService} from '../service/card.service';
import {Card} from '../../Model/card';
import {MatchService} from '../service/match.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  constructor(public matchService: MatchService, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.matchService.startMatch();
  }

  selectedCardForAttack(a: Card) {
    this.matchService.selectedCardForAttack = a;
  }
  selectedCardForDefense(a: Card) {
    this.matchService.selectedCardForDefense = a;
  }
  selectedCardToPutOnBattlefield(a: Card) {
    this.matchService.selectedCardToPutOnBattlefield = a;
  }

  playCard() {
    this.matchService.playCard();
  }

  endTurn() {
    if (!this.matchService.playedCardThisTurn) {
      this.snackBar.open('You must play a card during your turn', 'Close');
    }
    if (!this.matchService.attackedWithAll) {
      // this.snackBar.open('Every card on battlefield must attack during turn', 'Close');
    }
    this.matchService.endTurn();
  }
}
