import { Injectable } from '@angular/core';
import {Card} from '../../Model/card';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(public http: HttpClient) { }

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    };
  }

  getCards(): Observable<Card[]> {
    /*let card1: Card = new Card('Bibendum', 2, 3, 4);
    let card2: Card = new Card('Spradarajan', 10, 36, 12);
    let card3: Card = new Card('Ventriloque', 4, 6, 8);
    let cards: Card[] = [];
    cards.push(card1);
    cards.push(card2);
    cards.push(card3);
    console.log(cards);
    return cards;*/

    return this.http.get('api/Cards/GetCards', this.getOptions()).pipe(map(r => {
      let results = [];
      const response = r as any;

      // take every cardDTO in response and make card objects
      for (let card of response) {
        let newCard = new Card(card.Id, card.Name, card.Attack, card.Defense, card.Cost, card.Acquired, card.Image);
        results.push(newCard);
      }
      return results;
    }));
  }
}
