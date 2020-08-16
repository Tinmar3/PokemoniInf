export const setPaginationNumber = activeNumber => ({
  type: 'SET_PAGINATION_NUMBER',
  activeNumber
})

export const addToMyPokemon = (name, imgUrl) => ({
  type: 'ADD_TO_MY_POKEMON',
  payload: { name, imgUrl }
})

export const removeFromMyPokemon = name => ({
  type: 'REMOVE_FROM_MY_POKEMON',
  name
})
