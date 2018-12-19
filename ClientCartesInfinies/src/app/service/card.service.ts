import { Injectable } from '@angular/core';
import {Card} from '../../Model/card';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deck} from '../../Model/deck';
import {CreateDeckDTO} from '../../Model/DTO/create-deck-dto';
import {forEach} from '@angular/router/src/utils/collection';

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

  getDecks(): Observable<Deck[]> {
    let results = [];

    return this.http.get('api/Decks/GetDecks', this.getOptions()).pipe(map(r => {
      const response = r as any;
      for (let deck of response) {

        let cardsInDeck = [];
        for (let index = 0; index < deck.Cards.length; index++) {
          cardsInDeck[index] = new Card(
            deck.Cards[index].Id,
            deck.Cards[index].Name,
            deck.Cards[index].Attack,
            deck.Cards[index].Defense,
            deck.Cards[index].Cost,
            deck.Cards[index].Acquired = true,
            deck.Cards[index].Image);
        }
        let newDeck = new Deck(deck.Id, deck.Name, cardsInDeck);
        results.push(newDeck);
      }
      return results;
    }));
  }

  /*
  createDeck(deckToCreate: CreateDeckDTO): Observable<Deck> {
    return this.http.post('api/Decks/CreateDeck', deckToCreate, this.getOptions()).pipe(map(r => {
      const response = r as any;
      let output = new Deck(response.Id, response.Name, response.Cards)
      return output;
    }));
  }
  */
  createDeck(deckToCreate: CreateDeckDTO) {
    this.http.post('api/Decks/CreateDeck', deckToCreate, this.getOptions()).subscribe(r => {
      console.log(r);
    });
  }
}
