import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Results } from 'src/interfaces';
import { debounce } from "lodash";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() searchChange = new EventEmitter();
  @Output() typeSelected = new EventEmitter();
  @Output() abilitiesSelected = new EventEmitter();

  abilities: any;
  types: any;
  search: any;
  currentType: any;
  currentAbilities: any;
  pokemonList: any;

  @Input() set pokemons(pokemons: Results[]) {
    if (pokemons !== this.pokemonList) {
      this.pokemonList = pokemons;

      // Get types and abilities from each pokemon
      this.pokemonList.forEach((pokemon: any) => {
        this.setPokemonAbilities(pokemon);
        this.setPokemonTypes(pokemon);
      });
    }
  }
  constructor() {
    this.abilities = [];
    this.types = [];
  }

  ngOnInit(): void {}
  searchEvent = debounce( (search: any): void => {
    if (search === '') {
      this.search = search;
    }
    this.searchChange.emit(this.search);
  },500)

  onTypeSelected(): void {
    if (this.currentType) {
      this.typeSelected.emit(this.currentType);
    } else {
      this.typeSelected.emit('');
    }
  }

  onAbilitySelected(): void {
    if (this.currentAbilities && this.currentAbilities.length) {
      this.abilitiesSelected.emit(this.currentAbilities);
    } else {
      this.abilitiesSelected.emit('');
    }
  }

  setPokemonAbilities(pokemon: Results): void {

  }

  setPokemonTypes(pokemon: Results): void {

  }
}
