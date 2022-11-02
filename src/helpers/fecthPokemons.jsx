import axios from "axios";

export const fetchPokemons = async () => {
  const resp = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
  const smallPokemonList = resp.data.results;

  const response = await axios
    .get(import.meta.env.VITE_POKEMONS)
    .catch((err) => err);
  const create = response.data;
  return transformSmallPokemonIntoPokemon(smallPokemonList, create);
};

const transformSmallPokemonIntoPokemon = async (smallPokemonList, create) => {
  const pokemonArr = await Promise.all(
    smallPokemonList.map((poke) =>
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${poke.url.split("/")[6]}`)
        .then(({ data }) => {
          const id = data.id;
          const types = data.types.map((types) => types.type.name);
          const hp = data.stats[0].base_stat;
          const attack = data.stats[1].base_stat;
          const defense = data.stats[2].base_stat;
          const specialAt = data.stats[3].base_stat;
          const specialDef = data.stats[4].base_stat;
          const speed = data.stats[5].base_stat;
          return {
            id,
            name: data.name,
            types,
            hp,
            attack,
            defense,
            specialAt,
            specialDef,
            speed,
            created: false,
          };
        })
    )
  );

  if (create) {
    const pokemonsCreated = create.map((poke) => {
      const id = poke.id;
      const types = poke.types.map((types) => types.primaryType);
      const hp = poke.hp;
      const attack = poke.attack;
      const defense = poke.defense;
      const specialAt = poke.atesp;
      const specialDef = poke.defesp;
      const speed = poke.speed;
      const url = poke.url;
      const created = poke.created;
      return {
        id,
        name: poke.name,
        types,
        hp,
        attack,
        defense,
        specialAt,
        specialDef,
        speed,
        url,
        created,
      };
    });

    return {
      pokemonArr,
      pokemonsCreated,
    };
  }
  return pokemonArr;
};
