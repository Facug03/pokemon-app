import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pokemons: [],
  pokemonsFiltered: [],
  reset: false
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    initialize: (state, action) => {
      if (action.payload.pokemonsCreated) {
        state.pokemons = [...action.payload.pokemonArr, ...action.payload.pokemonsCreated]
      } else {
        state.pokemons = [...action.payload]
      }
    },
    searchPokemon: (state, action) => {
      if (!state.pokemons.find(poke => poke.name.toLowerCase().includes(action.payload.toLowerCase()))) {
        state.pokemonsFiltered = [{ id: 'noPokemonFound', filter: `${action.payload} doesn't exists`, search: true }]
      } else {
        state.pokemonsFiltered = state.pokemons.filter(poke => poke.name.toLowerCase().includes(action.payload.toLowerCase()))
      }
    },
    resetPage: (state, action) => {
      state.reset = action.payload
    },
    primaryType: (state, action) => {
      if (state.pokemonsFiltered.length > 0 && action.payload.make) {
        if (state.pokemonsFiltered.find(poke => poke.types[0] === action.payload.primary) || state.pokemonsFiltered.find(poke => poke.types[1] === action.payload.primary)) {
          state.pokemonsFiltered = [...state.pokemonsFiltered.filter(poke => poke.types[0] === action.payload.primary),
            ...state.pokemonsFiltered.filter(poke => poke.types[1] === action.payload.primary)]
        } else {
          state.pokemonsFiltered = [{ id: 'noPokemonFound', filter: `There are no Pokemons with type ${action.payload.primary}` }]
        }
      } else {
        if (state.pokemons.find(poke => poke.types[0] === action.payload.primary) || state.pokemons.find(poke => poke.types[1] === action.payload.primary)) {
          state.pokemonsFiltered = [...state.pokemons.filter(poke => poke.types[0] === action.payload.primary),
            ...state.pokemons.filter(poke => poke.types[1] === action.payload.primary)]
        } else {
          state.pokemonsFiltered = [{ id: 'noPokemonFound', filter: `There are no Pokemons with type ${action.payload.primary}` }]
        }
      }
    },
    orderByCreated: (state) => {
      if (state.pokemons.find(poke => poke.created === true)) {
        state.pokemonsFiltered = [...state.pokemons.filter(poke => poke.created === true)]
      } else {
        state.pokemonsFiltered = [{ id: 'noPokemonFound', filter: 'There are no Pokemons created' }]
      }
    },
    orderByAll: (state) => {
      state.pokemonsFiltered = state.pokemons
    },
    orderByOriginal: (state) => {
      if (state.pokemons.find(poke => poke.created === false)) {
        state.pokemonsFiltered = [...state.pokemons.filter(poke => poke.created === false)]
      } else {
        state.pokemonsFiltered = [{ id: 'noPokemonFound', filter: 'There are no Pokemons created' }]
      }
    },
    deleteCurrentFilter: (state, action) => {
      if (!action.filter) {
        state.pokemonsFiltered = state.pokemons
      }
    },
    orderByAz: (state, action) => {
      if (state.pokemonsFiltered.length > 0 && action.payload) {
        const sortArray = [...state.pokemonsFiltered]
        state.pokemonsFiltered = sortArray.sort(Az)
      } else {
        const sortArray = [...state.pokemons]
        state.pokemonsFiltered = sortArray.sort(Az)
      }
    },
    orderByZa: (state, action) => {
      if (state.pokemonsFiltered.length > 0 && action.payload) {
        const sortArrayZa = [...state.pokemonsFiltered]
        state.pokemonsFiltered = sortArrayZa.sort(Az).reverse()
      } else {
        const sortArrayZa = [...state.pokemons]
        state.pokemonsFiltered = sortArrayZa.sort(Az).reverse()
      }
    },
    orderByMaxAttack: (state, action) => {
      if (state.pokemonsFiltered.length > 0 && action.payload) {
        const orderAt = [...state.pokemonsFiltered]
        state.pokemonsFiltered = orderAt.sort((a, b) => a.attack - b.attack).reverse()
      } else {
        const orderAt = [...state.pokemons]
        state.pokemonsFiltered = orderAt.sort((a, b) => a.attack - b.attack).reverse()
      }
    },
    orderByMinAttack: (state, action) => {
      if (state.pokemonsFiltered.length > 0 && action.payload) {
        const orderAt = [...state.pokemonsFiltered]
        state.pokemonsFiltered = orderAt.sort((a, b) => a.attack - b.attack)
      } else {
        const orderAt = [...state.pokemons]
        state.pokemonsFiltered = orderAt.sort((a, b) => a.attack - b.attack)
      }
    },
    orderByMaxDef: (state, action) => {
      if (state.pokemonsFiltered.length > 0 && action.payload) {
        const orderDef = [...state.pokemonsFiltered]
        state.pokemonsFiltered = orderDef.sort((a, b) => a.defense - b.defense).reverse()
      } else {
        const orderDef = [...state.pokemons]
        state.pokemonsFiltered = orderDef.sort((a, b) => a.defense - b.defense).reverse()
      }
    },
    orderByMinDef: (state, action) => {
      if (state.pokemonsFiltered.length > 0 && action.payload) {
        const orderDef = [...state.pokemonsFiltered]
        state.pokemonsFiltered = orderDef.sort((a, b) => a.defense - b.defense)
      } else {
        const orderDef = [...state.pokemons]
        state.pokemonsFiltered = orderDef.sort((a, b) => a.defense - b.defense)
      }
    },
    orderByMaxHp: (state, action) => {
      if (state.pokemonsFiltered.length > 0 && action.payload) {
        const orderHp = [...state.pokemonsFiltered]
        state.pokemonsFiltered = orderHp.sort((a, b) => a.hp - b.hp).reverse()
      } else {
        const orderHp = [...state.pokemons]
        state.pokemonsFiltered = orderHp.sort((a, b) => a.hp - b.hp).reverse()
      }
    },
    orderByMinHp: (state, action) => {
      if (state.pokemonsFiltered.length > 0 && action.payload) {
        const orderHp = [...state.pokemonsFiltered]
        state.pokemonsFiltered = orderHp.sort((a, b) => a.hp - b.hp)
      } else {
        const orderHp = [...state.pokemons]
        state.pokemonsFiltered = orderHp.sort((a, b) => a.hp - b.hp)
      }
    },
    origins: () => {}
  }
})

export const { initialize, searchPokemon, resetPage, primaryType, deleteCurrentFilter, orderByCreated, orderByAll, orderByOriginal, orderByAz, orderByZa, orderByMaxAttack, orderByMinAttack, orderByMaxDef, orderByMinDef, orderByMaxHp, orderByMinHp } = pokemonSlice.actions

function Az (a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1
  }
  return 0
}

const origins = (origin) => {
  if (origin === 'All') return orderByAll
  else if (origin === 'Created') return orderByCreated
  else return orderByOriginal
}

export const deleteFilter = (filter, payload) => {
  if (filter === 'type') return orderByStats(payload)
  if (filter === 'order') return primaryType
  if (filter === 'origin') return origins(payload)
  return deleteCurrentFilter
}

export const orderByStats = (filter) => {
  if (filter === 'A-Z') {
    return orderByAz
  }
  if (filter === 'Z-A') {
    return orderByZa
  }
  if (filter === 'Hp++') {
    return orderByMaxHp
  }
  if (filter === 'Hp--') {
    return orderByMinHp
  }
  if (filter === 'Attack++') {
    return orderByMaxAttack
  }
  if (filter === 'Attack--') {
    return orderByMinAttack
  }
  if (filter === 'Defense++') {
    return orderByMaxDef
  }
  if (filter === 'Defense--') {
    return orderByMinDef
  }
}

export default pokemonSlice.reducer
