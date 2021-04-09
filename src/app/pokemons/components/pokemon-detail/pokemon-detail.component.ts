import { Location } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetail } from '../../model/pokemon-detail.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'pkmn-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private route : ActivatedRoute,private pokemonService : PokemonService, private location : Location) { }

  public pokemonDetails?: PokemonDetail;
  @Input() public idPokemon? : number;

  ngOnInit(): void {
    this.getDetail();
  }
  ngOnChanges(): void {
    this.pokemonDetails = undefined;
    this.getDetail();
  }

  getDetail(){
    if (this.idPokemon) {
      this.pokemonService.getPokemonDetail(this.idPokemon).subscribe(myResult => this.pokemonDetails = myResult);
    }
  }
}
