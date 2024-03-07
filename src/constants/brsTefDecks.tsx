import { DeckDisplay } from "../types/MatchupModels";
//https://pokemondb.net/sprites
//https://pokeapi.co/

// @TODO: This data should be stored in Backend. Need CRUD endpoints ultimately.
export const BRS_TEF_DECKS_CONSTANT: DeckDisplay[] = [
  {
    value: "Ancient Box",
    label: "Ancient Box",
    format: "F-on",
    cards: [
      "Koraidon",
      "Flutter Mane",
      "Radiant Greninja",
      "Professor Sada's Vitality",
      "Earthen Vessel",
      "Explorer's Guidance"
    ],
    sprites: [
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1007.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1005.png",
    ]
  },
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
		value: "Arceus / Vulpix",
		label: "Arceus / Vulpix",
		format: "F-on",
		cards: [
      "Arceus", 
      "Vulpix", 
      "Bidoof", 
      "Water Energy", 
      "Double Turbo"
    ],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
			"https://img.pokemondb.net/sprites/sun-moon/normal/vulpix-alolan.png",
		],
	},
  {
		value: "Charizard / Bibarel",
		label: "Charizard / Bibarel",
		format: "F-on",
		cards: [
			"Charmander",
			"Charizard",
			"Rare Candy",
      "Bidoof",
			"Bibarel",
			"Arven",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/400.png",
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
		value: "Future Box Hands",
		label: "Future Box Hands",
		format: "F-on",
		cards: [
			"Iron Hands",
      "Miraidon",
      "Iron Crown ex",
      "Techno Radar",
      "Reboot Pod",
      "Heavy Baton"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1023.png"
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
		value: "Great Tusk Mill",
		label: "Great Tusk Mill",
		format: "F-on",
		cards: [
			"Great Tusk",
      		"Explorer's Guidance",
      		"Double Turbo",
      		"Bravery Charm",
      		"Counter Catcher"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/984.png",
		],
	},
	{
		value: "Lost Zone Box",
		label: "Lost Zone Box",
		format: "F-on",
		cards: [
			"Comfey",
			"Mirage Gate",
			"Sableye",
			"Cramorant",
			"Roaring Moon",
			"Iron Hands"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/764.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1005.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
		],
	},
	{
		value: "Lost Zone Charizard",
		label: "Lost Zone Charizard",
		format: "F-on",
		cards: [
			"Comfey",
			"Mirage Gate",
			"Sableye",
			"Cramorant",
			"Charizard"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/764.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/302.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/006.png",
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
