import { Component, OnInit } from '@angular/core';
import { PagedData } from '../../model/paged-data.model';
import { Pokemon } from '../../model/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'pkmn-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  public pokemons: PagedData<Pokemon>={
    data: [],
    limit: 20,
    offset: 0
  };
  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons(): void{
    this.pokemonService.getPokemons(this.pokemons).subscribe(myResult => this.pokemons = myResult);
  }
  onScroll(): void{
    this.pokemons.offset+=this.pokemons.limit;
    console.log(this.pokemons.offset);
    this.pokemonService.getPokemons(this.pokemons).subscribe(myResult => this.pokemons.data = this.pokemons.data.concat(myResult.data));
    console.log(this.pokemons.data);
  }
}
