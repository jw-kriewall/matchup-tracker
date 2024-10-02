import { DeckDisplay } from "../types/MatchupModels";
//https://pokemondb.net/sprites
//https://pokeapi.co/

// @TODO: This data should be stored in Backend. Need CRUD endpoints ultimately.
export const BRS_SCR_DECKS_CONSTANT: DeckDisplay[] = [
  {
    value: "Ancient Box",
    label: "Ancient Box",
    format: "BRS-SCR",
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
		format: "BRS-SCR",
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
		format: "BRS-SCR",
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
		format: "BRS-SCR",
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
		format: "BRS-SCR",
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
		label: "Chien Pao",
		format: "BRS-SCR",
		cards: [
			"Chien-Pao",
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
		value: "Dialga VStar",
		label: "Dialga VStar",
		format: "BRS-SCR",
		cards: [
			"Dialga",
			"Metang",
			"Beldum",
			"Metal Energy"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/375.png",
		],
	},
	{
		value: "Dragapult",
		label: "Dragapult",
		format: "BRS-SCR",
		cards: [
			"Dragapult",
			"Dreepy"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/887.png",
		],
	},
	{
		value: "Espathra / Xatu",
		label: "Espathra / Xatu",
		format: "BRS-SCR",
		cards: [
			"Espathra",
			"Flittle",
			"Natu",
			"Xatu",
			"Tulip",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/956.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/178.png",
		],
	},
  	{
		value: "Future Box Hands",
		label: "Future Box Hands",
		format: "BRS-SCR",
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
		value: "Gardevoir",
		label: "Gardevoir",
		format: "BRS-SCR",
		cards: [
			"Gardevoir",
			"Kirlia",
			"Ralts",
			"Scream Tail",
			"Buddy-Buddy Poffin",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png",
		],
	},
	{
		value: "Gholdengo",
		label: "Gholdengo",
		format: "BRS-SCR",
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
		format: "BRS-SCR",
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
		format: "BRS-SCR",
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
		value: "Iron Thorns",
		label: "Iron Thorns",
		format: "BRS-SCR",
		cards: [
			"Iron Thorns",
      		"Energize",
      		"Double Turbo",
      		"Crushing Hammer",
      		"Techno Radar"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/984.png",
		],
	},
	{
		value: "Lost Zone Box",
		label: "Lost Zone Box",
		format: "BRS-SCR",
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
		format: "BRS-SCR",
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
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
		],
	},
	{
		value: "Lugia / Archeops",
		label: "Lugia / Archeops",
		format: "BRS-SCR",
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
		value: "Meowscarada",
		label: "Meowscarada",
		format: "BRS-SCR",
		cards: [
			"Meowscarada",
			"Sprigatito",
			"Floragato",
			"Radiant Alakazam",
			"Double Turbo",
			"Rare Candy",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/908.png",
		],
	},
	{
		value: "Palkia / Noctowl",
		label: "Palkia / Noctowl",
		format: "BRS-SCR",
		cards: [
			"Palkia",
			"Noctowl",
			"Area Zero Underdepths"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/484.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/164.png"
		],
	},
	{
		value: "Raging Bolt",
		label: "Raging Bolt",
		format: "BRS-SCR",
		cards: [
			"Raging Bolt",
			"Ogerpon",
			"Sada's Vitality",
			"Earthen Vessel"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1021.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1017.png"
		],
	},
	{
		value: "Regidrago",
		label: "Regidrago",
		format: "BRS-SCR",
		cards: [
			"Regidrago",
			"Ogerpon",
			"Sada's Vitality",
			"Kyurem",
			"Radiant Charizard",
			"Energy Switch"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/895.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1017.png"
		],
	},
	{
		value: "Roaring Moon",
		label: "Roaring Moon",
		format: "BRS-SCR",
		cards: [
			"Roaring Moon",
			"Dark Patch", 
			"Sada's Vitality", 
			"Squawkabilly"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1005.png",
		],
	},
	{
		value: "Snorlax Stall",
		label: "Snorlax Stall",
		format: "BRS-SCR",
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
		value: "Terapagos / Dusknoir",
		label: "Terapagos / Dusknoir",
		format: "BRS-SCR",
		cards: [
			"Terapagos",
			"Dusknoir",
			"Area Zero Underdepths",
			"Double Turbo",
			"Noctowl"
		],
		sprites: [
			"https://www.smogon.com/dex/media/sprites/xy/terapagos-terastal.gif",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/477.png"
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
