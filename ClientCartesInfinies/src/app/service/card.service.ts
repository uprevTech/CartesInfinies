import { Injectable } from '@angular/core';
import {Card} from '../../Model/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  getCards() {
    let card1: Card = new Card('Bibendum', 2, 3, 4);
    let card2: Card = new Card('Spradarajan', 10, 36, 12);
    let card3: Card = new Card('Ventriloque', 4, 6, 8);
    let cards: Card[] = [];
    cards.push(card1);
    cards.push(card2);
    cards.push(card3);
    console.log(cards);
    return cards;
  }
  constructor() { }
}
