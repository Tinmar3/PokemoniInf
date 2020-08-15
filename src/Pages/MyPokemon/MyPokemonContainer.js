import { connect } from 'react-redux'
import { removeFromMyPokemon } from '../../Store/Actions'
import MyPokemon from './MyPokemon'

const mapStateToProps = state => ({
  myPokemon: state.myPokemon
})

const mapDispatchToProps = dispatch => ({
  removeFromMyPokemon: name => dispatch(removeFromMyPokemon(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemon)
