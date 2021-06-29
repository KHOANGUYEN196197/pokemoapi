import { Results } from './../../../interfaces';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { PokemonService } from './../../services/pokemon.services';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  @Output() exportPokemons = new EventEmitter();
  limit = 10;
  pokemonsLoaded: any;
  pokemons: any;
  query:any;
  typeFilters: any;
  abilityFilters: any;
  imgSize = { width: '50%', height: 400 };
  imageObject = [
    {
      video: 'https://youtu.be/D0zYJ1RQ-fs',
      title:
        'Pokémon: Mewtwo Strikes Back—Evolution | Official Trailer | Netflix',
    },
    {
      video: 'https://www.youtube.com/watch?v=1roy4o4tqQM',
      title: 'POKÉMON Detective Pikachu - Official Trailer #1',
    },
    {
      video: 'https://www.youtube.com/watch?v=bILE5BEyhdo',
      title: 'POKÉMON Detective Pikachu - Official Trailer 2',
    },
    {
      video: 'https://www.youtube.com/watch?v=uBYORdr_TY8',
      title:
        'Pokémon Sword and Shield Trailer - New Pokemon, Legendaries, Dynamax',
    },
  ];

  @Input() set search(newSearch: string) {
    if (newSearch !== this.query) {
      this.query = newSearch;
    }
  }

  @Input() set typeFilter(type: string) {
    if (type !== this.typeFilter) {
      this.typeFilters = type;
    }
  }

  @Input() set abilityFilter(abilities: Array<string>) {
    if (abilities !== this.abilityFilters) {
      this.abilityFilters = abilities;
    }
  }
  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pokemonsLoaded = false;
    this.getPokemons();
  }
  getPokemons() {
    this.pokemonService.getPokemon(this.limit).subscribe((data) => {
      this.pokemons = data;

      if (this.pokemons.results && this.pokemons.results.length) {
        this.pokemons.results.forEach((pokemon: any) => {
          pokemon.id =
            pokemon.url.split('/')[pokemon.url.split('/').length - 2];

          this.getPokemonDetails(pokemon);
          this.getPokemonSpeciesDetails(pokemon);
        });
      }
    });
  }
  getPokemonDetails(pokemon: any): void {
    this.pokemonService.getPokemonDetails(pokemon.name).subscribe((details) => {
      this.pokemonsLoaded = true;
      pokemon.details = details;
      this.exportPokemons.emit(this.pokemons.results);
    });
  }

  getPokemonSpeciesDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonSpecies(pokemon.name)
      .subscribe((species: any) => {
        const entries = species.flavor_text_entries;
        if (entries) {
          entries.some((flavor: any) => {
            if (flavor.language.name === 'en') {
              pokemon.description = flavor.flavor_text;
            }
          });
        }
      });
  }
  seeMore() {
    this.limit += 10;
    this.getPokemons();
  }
  detailInfo(pokemon: any) {
    const dialogRef = this.dialog.open(DetailInfoComponent);
    dialogRef.componentInstance.data = pokemon;
  }
  scrollToElement($element: any): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
