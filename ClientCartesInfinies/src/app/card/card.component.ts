import { Component, OnInit } from '@angular/core';
import {CardService} from '../service/card.service';
import {Card} from '../../Model/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public cardService: CardService) { }

  public cardList: Card[];

  ngOnInit() {
    this.cardService.getCards().subscribe(r => this.cardList = r);
  }

}
