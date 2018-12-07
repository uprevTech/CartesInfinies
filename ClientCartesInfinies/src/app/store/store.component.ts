import { Component, OnInit } from '@angular/core';
import {Card} from '../../Model/card';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor() { }

  allCards: Array<Card>;
  ngOnInit() {
    // this.serviceAPI.get
  }

}
