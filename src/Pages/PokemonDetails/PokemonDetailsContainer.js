import { connect } from 'react-redux'
import { addToMyPokemon, removeFromMyPokemon } from '../../Store/Actions'
import PokemonDetails from './PokemonDetails'

const mapStateToProps = state => ({
  isInMyPokemonList: name => state.myPokemon.find(item => item.name === name)
})

const mapDispatchToProps = dispatch => ({
  addToMyPokemon: (name, imgUrl) => dispatch(addToMyPokemon(name, imgUrl)),
  removeFromMyPokemon: name => dispatch(removeFromMyPokemon(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails)
