import { DeckDisplay } from "../types/MatchupModels";
//https://pokemondb.net/sprites
//https://pokeapi.co/

// @TODO: This data should be stored in Backend. Need CRUD endpoints ultimately.
export const ALL_DECKS_CONSTANT: DeckDisplay[] = [
	{
		value: "Arceus / Giratina",
		label: "Arceus / Giratina",
		format: "F-on",
		cards: [
      "Arceus", 
      "Giratina", 
      "Bidoof", 
      "Grass Energy", 
      "Double Turbo"
    ],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png",
		],
	},
	{
		value: "Charizard / Pidgeot",
		label: "Charizard / Pidgeot",
		format: "F-on",
		cards: [
			"Charmander",
			"Charizard",
			"Pidgey",
			"Rare Candy",
			"Pidgeot",
			"Rotom V",
			"Arven",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
		],
	},
	{
		value: "Chien Pao",
		label: "Chein Pao",
		format: "F-on",
		cards: [
			"Chien Pao",
			"Frigibax",
			"Baxcalibur",
			"Rare Candy",
			"Bidoof",
			"Superior Energy Retrieval",
			"Radiant Greninja",
			"Prime Catcher",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1002.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/998.png",
		],
	},
	{
		value: "Gholdengo",
		label: "Gholdengo",
		format: "F-on",
		cards: [
			"Gholdengo",
			"Radiant Greninja",
			"Palkia",
			"Ghimmighoul",
			"Superior Energy Retrieval",
			"Earthen Vessel",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1000.png",
		],
	},
	{
		value: "Giratina VStar",
		label: "Giratina VStar",
		format: "F-on",
		cards: [
			"Jet Energy",
			"Giratina V",
			"Comfey",
			"Cramorant",
			"Sableye",
			"Colress's Experiment",
			"Mirage Gate",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/764.png",
		],
	},
	{
		value: "Lugia / Archeops",
		label: "Lugia / Archeops",
		format: "F-on",
		cards: [
			"Lugia",
			"Archeops",
			"Minccino",
			"Jet Energy",
			"Capturing Aroma",
			"Ultra Ball",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/567.png",
		],
	},
	{
		value: "Roaring Moon",
		label: "Roaring Moon",
		format: "F-on",
		cards: ["Roaring Moon", "Dark Patch", "Sada's Vitality", "Squawkabilly"],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1005.png",
		],
	},
	{
		value: "Snorlax Stall",
		label: "Snorlax Stall",
		format: "F-on",
		cards: [
			"Penny",
			"Snorlax",
			"Mimikyu",
			"Miss Fortune Sisters",
			"Erika's Invitation",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
		],
	},

	{
		value: "Other",
		label: "Other",
		cards: [],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/left-poke-ball.png",
		],
	},
	{
		value: "Unknown",
		label: "Unknown",
		cards: [],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201.png",
		],
	},
];
