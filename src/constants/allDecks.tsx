import { DeckDisplay } from "../types/MatchupModels";
//https://pokemondb.net/sprites

// @TODO: This data should be stored in Backend. Need CRUD endpoints ultimately.
export const allDecksConstant: DeckDisplay[] = [
  {
    value: "FS Mew",
    label: "FS Mew",
    sprites: [
      "https://img.pokemondb.net/sprites/sword-shield/icon/mew.png",
      "https://img.pokemondb.net/sprites/sword-shield/icon/meloetta.png",
    ],
  },
  {
    value: "Charizard / Pidgeot",
    label: "Charizard / Pidgeot",
    sprites: [
      "https://img.pokemondb.net/sprites/sword-shield/icon/charizard.png",
      "https://img.pokemondb.net/sprites/sword-shield/icon/pidgeot.png",
    ],
  },
  {
    value: "DTE Mew",
    label: "DTE Mew",
    sprites: [
      "https://img.pokemondb.net/sprites/sword-shield/icon/mew.png",
      "https://img.pokemondb.net/sprites/sword-shield/icon/genesect.png",
    ],
  },
  {
    value: "Miraidon / Flaaffy",
    label: "Miraidon / Flaaffy",
    sprites: [
      "https://img.pokemondb.net/sprites/scarlet-violet/icon/miraidon.png",
      "https://img.pokemondb.net/sprites/sword-shield/icon/flaaffy.png",
    ],
  },
  {
    value: "Roaring Moon",
    label: "Roaring Moon",
    sprites: [
      "https://img.pokemondb.net/sprites/scarlet-violet/icon/roaring-moon.png",
    ],
  },
  {
    value: "Snorlax Stall",
    label: "Snorlax Stall",
    sprites: [
      "https://img.pokemondb.net/sprites/sword-shield/icon/snorlax.png",
    ],
  },
  {
    value: "Lost Box Charizard",
    label: "Lost Box Charizard",
    sprites: [
      "https://img.pokemondb.net/sprites/sword-shield/icon/comfey.png",
      "https://img.pokemondb.net/sprites/sword-shield/icon/charizard.png",
    ],
  },
  {
    value: "Turbo Miraidon",
    label: "Turbo Miraidon",
    sprites: [
      "https://img.pokemondb.net/sprites/scarlet-violet/icon/miraidon.png",
    ],
  },
  {
    value: "Gholdengo",
    label: "Gholdengo",
    sprites: [
      "https://img.pokemondb.net/sprites/scarlet-violet/icon/gholdengo.png",
    ],
  },
];
