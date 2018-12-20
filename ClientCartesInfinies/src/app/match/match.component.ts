import { Component, OnInit } from '@angular/core';
import {Deck} from '../../Model/deck';
import {CardService} from '../service/card.service';
import {Card} from '../../Model/card';
import {MatchService} from '../service/match.service';
import {MatSnackBar} from '@angular/material';
import {CardMatch} from '../../Model/card-match';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {



  constructor(public matchService: MatchService, public userService: UserService, public snackBar: MatSnackBar, public router: Router) {

  }

  ngOnInit() {
    this.matchService.startMatch();
  }

  selectedCardForAttack(a: CardMatch) {
    this.matchService.selectedCardForAttack = a;
  }
  selectedCardForDefense(a: CardMatch) {
    this.matchService.selectedCardForDefense = a;
  }
  selectedCardToPutOnBattlefield(a: CardMatch) {
    this.matchService.selectedCardToPutOnBattlefield = a;
  }

  playCard() {
    if (!this.matchService.gameOver) {
      this.matchService.playCard();
    }
  }

  attack() {
    if (this.matchService.gameOver) {
      return;
    }

    if (!this.matchService.playedCardThisTurn) {
      this.snackBar.open('You must play a card Before attacking', 'Close');
    } else {

      this.matchService.attack();
      if (this.matchService.gameOver) {
        // Donner les points pour la victoire
        if (this.matchService.playerWin) {
          alert('You Win!');
          this.userService.addVictoryPoints();
        } else {
          alert('You Lose!');
        }
        // rediriger vers page accueil
        this.router.navigate(['/Player']);
      }
    }
  }

  endTurn() {
    if (this.matchService.gameOver) {
      return;
    }

    if (!this.matchService.playedCardThisTurn) {

      this.snackBar.open('You must play a card during your turn', 'Close');

    } else {
      this.matchService.endTurn();
      // le ai va avoir jouer son tour rendu ici alors on peux verifier si le jeu est termine
      if (this.matchService.gameOver) {
        // Donner les points pour la victoire
        if (this.matchService.playerWin) {
          alert('You Win!');
          this.userService.addVictoryPoints();
        } else {
          alert('You Lose!');
        }
        // rediriger vers page accueil
        this.router.navigate(['/Player']);
      }
    }
  }
}
