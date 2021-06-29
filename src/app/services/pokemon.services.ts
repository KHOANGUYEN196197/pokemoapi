import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokeAPI: any;
  pokemonVersionAPI: any;
  pokemonGenerationAPI: any;
  pokemonLocationAPI: any;
  pokemonItemAPI: any;
  pokeSpeciesAPI: any;
  constructor(private http: HttpClient) {
    this.pokeAPI = environment.pokemon;
    this.pokemonVersionAPI = environment.pokemonVersion;
    this.pokemonGenerationAPI = environment.pokemonGeneration;
    this.pokemonLocationAPI = environment.pokemonLocation;
    this.pokemonItemAPI = environment.pokemonItem;
    this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
  }
  getPokemon(limit:any): Observable<any> {
    return this.http
      .get(`${this.pokeAPI}?limit=${limit}`)
  }

  /**
   * Uses pokemon name to retrieve individual pokemon details
   */
  getPokemonDetails(name: any): Observable<any> {
    return this.http
      .get(`${this.pokeAPI}/${name}`)
  }

  getPokemonSpecies(name: any): Observable<any> {
    return this.http
      .get<any>(`${this.pokeSpeciesAPI}/${name}`)
  }
 
}
