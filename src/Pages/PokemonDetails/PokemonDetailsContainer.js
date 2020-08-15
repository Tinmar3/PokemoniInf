import { connect } from 'react-redux'
import { addToMyPokemon, removeFromMyPokemon } from '../../Store/Actions'
import PokemonDetails from './PokemonDetails'

const mapStateToProps = state => ({
  isInMyPokemonList: name => state.myPokemon.find(item => item === name)
})

const mapDispatchToProps = dispatch => ({
  addToMyPokemon: name => dispatch(addToMyPokemon(name)),
  removeFromMyPokemon: name => dispatch(removeFromMyPokemon(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails)
