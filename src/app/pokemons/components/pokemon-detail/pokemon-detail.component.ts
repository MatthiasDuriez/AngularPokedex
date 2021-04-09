import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("ouioui "+id);
    this.pokemonService.getPokemonDetail(id).subscribe(myResult => this.pokemonDetails = myResult);
  }
  goBack(){
    this.location.back();
  }
}
