import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedData } from '../model/paged-data.model';
import { Pokemon } from '../model/pokemon.model';
import { catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import { PokemonDetail } from '../model/pokemon-detail.model';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiUrl = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";

  constructor(private http : HttpClient) { }

  getPokemons(pokemons : PagedData<Pokemon>): Observable<PagedData<Pokemon>> {
    const getUrl = `${this.apiUrl}/pokemons?offset=${pokemons.offset}&limit=${pokemons.limit}`;
    return this.http.get<PagedData<Pokemon>>(getUrl).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', undefined))
    );
  }
  getPokemonDetail(id: number): Observable<PokemonDetail>{
    const getUrl = `${this.apiUrl}/pokemons/${id}`;
    return this.http.get<PokemonDetail>(getUrl);
  }
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {

    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
