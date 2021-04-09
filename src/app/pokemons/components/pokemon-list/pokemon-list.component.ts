import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { PagedData } from '../../model/paged-data.model';
import { PokemonDetail } from '../../model/pokemon-detail.model';
import { Pokemon } from '../../model/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'pkmn-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  public filter : string ="";
  public pokemons: PagedData<Pokemon>={
    data: [],
    limit: 20,
    offset: 0
  };
  constructor(private pokemonService : PokemonService) { }

  @Output() public childEvent = new EventEmitter();

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons(): void{
    this.pokemonService.getPokemons(this.pokemons).subscribe(myResult => this.pokemons = myResult);
  }
  onScroll(): void{
    console.log("YO");
    this.pokemons.offset+=this.pokemons.limit;
    console.log(this.pokemons.offset);
    this.pokemonService.getPokemons(this.pokemons,this.filter).subscribe(myResult => this.pokemons.data = this.pokemons.data.concat(myResult.data));
    console.log(this.pokemons.data);
  }
  selection(pokemon : Pokemon):void{
    this.childEvent.emit(pokemon.id);
  }
  search(filter: string):void{
    this.filter = filter;
    if (filter.length>0) {
      this.pokemons.limit=20;
      this.pokemons.offset=0;
    }
    if (filter.length==0) {
      this.pokemons.limit=20;
      this.pokemons.offset=0;
      this.getPokemons();
    }
    this.pokemonService.getPokemons(this.pokemons,filter).subscribe(myResult => this.pokemons.data = myResult.data);
  }
}
