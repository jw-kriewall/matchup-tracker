import { DeckDisplay } from "../types/MatchupModels";
//https://pokemondb.net/sprites
//https://pokeapi.co/

// @TODO: This data should be stored in Backend. Need CRUD endpoints ultimately.
export const BRS_TWM_DECKS_CONSTANT: DeckDisplay[] = [
	{
		value: "Ancient Box",
		label: "Ancient Box",
		format: "BRS-TWM",
		cards: [
			"Koraidon",
			"Flutter Mane",
			"Radiant Greninja",
			"Professor Sada's Vitality",
			"Earthen Vessel",
			"Explorer's Guidance",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1007.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1005.png",
		],
	},
	{
		value: "Arceus / Giratina",
		label: "Arceus / Giratina",
		format: "BRS-TWM",
		cards: ["Arceus", "Giratina", "Bidoof", "Grass Energy", "Double Turbo"],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png",
		],
	},
    {
		value: "Blissey ex",
		label: "Blissey ex",
		format: "BRS-TWM",
		cards: [
			"Blissey",
			"Chansey",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/242.png",
		],
	},
	{
		value: "Charizard / Bibarel",
		label: "Charizard / Bibarel",
		format: "BRS-TWM",
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
		format: "BRS-TWM",
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
		format: "BRS-TWM",
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
		format: "BRS-TWM",
		cards: ["Dialga", "Metang", "Beldum", "Metal Energy"],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/375.png",
		],
	},
    {
		value: "Dragapult ex / Pidgeot ex",
		label: "Dragapult ex / Pidgeot ex",
		format: "BRS-TWM",
		cards: ["Dragapult", "Drakloak", "Dreepy", "Pidgeot", "Pidgey"],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/887.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
		],
	},
    {
		value: "Dragapult ex / Xatu",
		label: "Dragapult ex / Xatu",
		format: "BRS-TWM",
		cards: ["Dragapult", "Drakloak", "Dreepy", "Natu", "Xatu"],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/887.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/178.png",
		],
	},
	{
		value: "Espathra / Xatu",
		label: "Espathra / Xatu",
		format: "BRS-TWM",
		cards: ["Espathra", "Flittle", "Natu", "Xatu", "Tulip"],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/956.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/178.png",
		],
	},
	{
		value: "Future Box Hands",
		label: "Future Box Hands",
		format: "BRS-TWM",
		cards: [
			"Iron Hands",
			"Miraidon",
			"Iron Crown ex",
			"Techno Radar",
			"Reboot Pod",
			"Heavy Baton",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1023.png",
		],
	},
	{
		value: "Festival Lead",
		label: "Festival Lead",
		format: "BRS-TWM",
		cards: [
			"Applin",
			"Dipplin",
			"Grookey",
			"Thwackey",
			"Festival Grounds",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1011.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/811.png",
		],
	},
	{
		value: "Gardevoir",
		label: "Gardevoir",
		format: "BRS-TWM",
		cards: [
			"Gardevoir",
			"Kirlia",
			"Ralts",
			"Scream Tail",
			"Buddy-Buddy Poffin",
            "Munkidori",
            "Drifloon"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png",
		],
	},
	{
		value: "Gholdengo",
		label: "Gholdengo",
		format: "BRS-TWM",
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
		format: "BRS-TWM",
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
		format: "BRS-TWM",
		cards: [
			"Great Tusk",
			"Explorer's Guidance",
			"Double Turbo",
			"Bravery Charm",
			"Counter Catcher",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/984.png",
		],
	},
    {
		value: "Greninja ex",
		label: "Greninja ex",
		format: "BRS-TWM",
		cards: [
			"Greninja",
			"Froakie",
			"Frogadier",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png",
		],
	},
    {
		value: "Iron Thorns ex",
		label: "Iron Thorns ex",
		format: "BRS-TWM",
		cards: [
			"Iron Thorns ex",
            "Crushing Hammer"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/995.png",
		],
	},
	{
		value: "Lost Zone Box",
		label: "Lost Zone Box",
		format: "BRS-TWM",
		cards: [
			"Comfey",
			"Mirage Gate",
			"Sableye",
			"Cramorant",
			"Roaring Moon",
			"Iron Hands",
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
		format: "BRS-TWM",
		cards: ["Comfey", "Mirage Gate", "Sableye", "Cramorant", "Charizard"],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/764.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/302.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
		],
	},
	{
		value: "Lugia / Archeops",
		label: "Lugia / Archeops",
		format: "BRS-TWM",
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
		format: "BRS-TWM",
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
		value: "Miraidon",
		label: "Miraidon",
		format: "BRS-TWM",
		cards: [
			"Miraidon",
			"Electric Generator",
			"Iron Hands",
			"Raikou",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1008.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
		],
	},
	{
		value: "Pidgeot Control",
		label: "Pidgeot Control",
		format: "BRS-TWM",
		cards: [
			"Pidgey",
			"Pidgeot",
			"Miss Fortune Sisters",
			"Luxray",
			"Jigglypuff",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
		],
	},
    {
		value: "Raging Bolt ex / Teal Mask Ogerpon ex",
		label: "Raging Bolt ex / Teal Mask Ogerpon ex",
		format: "BRS-TWM",
		cards: [
			"Raging Bolt",
			"Ogerpon",
            "Professor Sada's Vitality",
            "Bug Catching Set"
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1021.png",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1017.png",
		],
	},
	{
		value: "Regidrago VStar",
		label: "Regidrago VStar",
		format: "BRS-TWM",
		cards: [
			"Regidrago",
		],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/895.png",
		],
	},
	{
		value: "Roaring Moon",
		label: "Roaring Moon",
		format: "BRS-TWM",
		cards: ["Roaring Moon", "Dark Patch", "Sada's Vitality", "Squawkabilly"],
		sprites: [
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1005.png",
		],
	},
	{
		value: "Snorlax Stall",
		label: "Snorlax Stall",
		format: "BRS-TWM",
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
