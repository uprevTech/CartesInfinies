import { Component, OnInit } from '@angular/core';
import {CardService} from '../service/card.service';
import {Card} from '../../Model/card';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private modalService: NgbModal, public cardService: CardService) { }

  public cardList: Card[];

  ngOnInit() {
    this.cardService.getCards().subscribe(r => this.cardList = r);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;
  }

//https://ng-bootstrap.github.io/#/components/modal/examples holy shit wtf

}
