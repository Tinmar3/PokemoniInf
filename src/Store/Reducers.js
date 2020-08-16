import { combineReducers } from 'redux'

const mockData = [
  {
    name: 'spearow',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png'
  },
  {
    name: 'kakuna',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png'
  }
]

const pokemonList = (state = { activePagination: 1 }, action) => {
  switch (action.type) {
    case 'SET_PAGINATION_NUMBER':
      return { ...state, activePagination: action.activeNumber }
    default:
      return state
  }
}

const myPokemon = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_MY_POKEMON':
      return [...state, { name: action.payload.name, imgUrl: action.payload.imgUrl }]
    case 'REMOVE_FROM_MY_POKEMON':
      return state.filter(item => item.name !== action.name)
    default:
      return state
  }
}

export default combineReducers({
  pokemonList,
  myPokemon
})
