import {Card} from '../card';

export class CreateDeckDTO {
  constructor(public Name: string, public Cards: Card[]) {}
}
