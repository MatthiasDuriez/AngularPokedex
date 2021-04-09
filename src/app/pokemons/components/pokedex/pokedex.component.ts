import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pkmn-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  public id =0;
  constructor() { }

  ngOnInit(): void {
  }
  changementId(idBis : number){
    this.id = idBis;
  }

}
