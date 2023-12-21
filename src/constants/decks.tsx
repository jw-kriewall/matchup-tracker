import { DeckDisplay } from "../types/MatchupModels";
//https://pokemondb.net/sprites

// @TODO: This data should be stored in Backend. Need CRUD endpoints ultimately.
export const decks: DeckDisplay[] = [
    {
      value: 'Pikachu',
      label: 'Pikachu',
      sprites: [
        'https://img.pokemondb.net/sprites/black-white/normal/pikachu-f.png'
      ]
    },
    {
      value: 'Charizard',
      label: 'Charizard',
      sprites: [
        'https://img.pokemondb.net/sprites/black-white/normal/charizard.png'
      ]
    },
    {
      value: 'Bulbasaur',
      label: 'Bulbasaur',
      sprites: [
        'https://img.pokemondb.net/sprites/black-white/normal/bulbasaur.png',
        'https://img.pokemondb.net/sprites/black-white/normal/venusaur-f.png'
      ]
    },
    {
      value: 'Squirtle',
      label: 'Squirtle',
      sprites: [
        'https://img.pokemondb.net/sprites/black-white/normal/squirtle.png'
      ]
    },
    {
      value: 'Dragonite',
      label: 'Dragonite',
      sprites: [
        'https://img.pokemondb.net/sprites/ruby-sapphire/normal/dragonite.png'
      ]
    },
    {
      value: 'Mewtwo',
      label: 'Mewtwo',
      sprites: [
        'https://img.pokemondb.net/sprites/diamond-pearl/normal/mewtwo.png'
      ]
    }
  ];