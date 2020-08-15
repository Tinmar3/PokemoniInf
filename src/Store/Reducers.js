import { combineReducers } from 'redux'

const myPokemon = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_MY_POKEMON':
      return [...state, action.name]
    case 'REMOVE_FROM_MY_POKEMON':
      return state.filter(item => item !== action.name)
    default:
      return state
  }
}

export default combineReducers({
  myPokemon
})
