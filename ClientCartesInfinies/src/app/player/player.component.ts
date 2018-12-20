import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../service/card.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(public cardService: CardService) { }

  ngOnInit() {
    this.cardService.createStarterDeck();
  }

}
