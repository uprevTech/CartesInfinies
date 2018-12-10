import { Component, OnInit } from '@angular/core';
import {CardService} from '../service/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public cardService: CardService) { }

  ngOnInit() {
    this.cardService.getCards();
  }

}
