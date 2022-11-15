"use strict";
// initialize shorthands for query selector
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const buttons = $(".gen-buttons");
const cards = $(".cards");
const search = $(".search > input");

class PokeApi {
  static async getPokeGeneration(genId) {
    return await (
      await fetch(`https://pokeapi.co/api/v2/generation/${genId}`)
    ).json();
  }

  static async getPokeSpecies(speciesUrl) {
    return await (await fetch(speciesUrl)).json();
  }

  static async getPokemon(pokemonDataUrl) {
    return await (await fetch(pokemonDataUrl)).json();
  }
}

class PokemonCard {
  constructor(name, types, imgSrc) {
    this.name = name;
    this.typesData = types;
    this.imgSrc = imgSrc;
  }

  pokemonTypes = {
    bug: [
      "#83C300",
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg",
    ],
    dark: [
      "#5B5466",
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg",
    ],
    dragon: [
      "#006FC9",
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg",
    ],
    electric: [
      "#FBD100",
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg",
    ],
    fairy: [
      "#FB89EB",
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg",
    ],
    fighting: [
      "#E0306A",
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg",
    ],
    fire: [
      "#FF9741",
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg",
    ],
    flying: [
      "#89AAE3",
      "https://upload.wikimedia.org/wikipedia/commons/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg",
    ],
    ghost: [
      "#4C6AB2",
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg",
    ],
    grass: [
      "#38BF4B",
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg",
    ],
    ground: [
      "#E87236",
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg",
    ],
    ice: [
      "#4CD1C0",
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg",
    ],
    normal: [
      "#919AA2",
      "https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg",
    ],
    poison: [
      "#B567CE",
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg",
    ],
    psychic: [
      "#FF6675",
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg",
    ],
    rock: [
      "#C8B686",
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg",
    ],
    steel: [
      "#5A8EA2",
      "https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg",
    ],
    water: [
      "#3692DC",
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg",
    ],
  };

  renderCard() {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("card");
    pokemonCard.innerHTML = `
          <div class="img-container">
            <img src="${this.imgSrc}" alt="${this.name}">
          </div>
         <div class="name-container">
            <p>${this.name.toUpperCase()}</p>
            <div>${this.typesData
              .map(
                (slot) =>
                  '<img src="' +
                  this.pokemonTypes[slot.type.name][1] +
                  '" class="icons"/>'
              )
              .join("")}
             </div>
         </div>
    `;
    console.log(this.typesData);
    pokemonCard.style.background =
      this.pokemonTypes[this.typesData[0].type.name][0];
    cards.appendChild(pokemonCard);
  }
}

class Pokedex {
  pokemonCards = [];

  async getPokemonCards(genId) {
    const genData = await PokeApi.getPokeGeneration(genId);
    result.innerHTML = `${genData.pokemon_species.length} pokemons were found in generation ${genId}...`;
    search.style.visibility = "visible";
    console.log(genData);

    Promise.all(
      genData.pokemon_species.map(async (species) => {
        const speciesData = await PokeApi.getPokeSpecies(species.url);
        const pokemonData = await PokeApi.getPokemon(
          speciesData.varieties[0].pokemon.url
        );
        const { name, sprites, types } = pokemonData;
        const pokemon = new PokemonCard(
          name,
          types,
          sprites.other["official-artwork"].front_default
        );
        this.pokemonCards.push(pokemon);
        this.renderCards();
      })
    );
  }

  renderCards() {
    cards.innerHTML = "";
    this.pokemonCards.forEach((pokemonCard) => {
      pokemonCard.renderCard();
    });
  }
}

// create the Pokedex app
let app = new Pokedex();

buttons.addEventListener("click", (e) => {
  app.pokemonCards = [];
  app.getPokemonCards(e.target.value);
});

search.addEventListener("keyup", (e) => {
  const input = e.target.value.toLowerCase();
  const pokeCards = $$(".card");
  for (const card of pokeCards) {
    let pokemonName = card.children[1].children[0].innerHTML.toLowerCase();
    const isVisible = pokemonName.includes(input);
    card.classList.toggle("hide", !isVisible);
  }
});
