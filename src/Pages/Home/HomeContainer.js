import { connect } from 'react-redux'
import { setPaginationNumber } from '../../Store/Actions'
import Home from './Home'

const mapStateToProps = state => ({
  activePagination: state.pokemonList.activePagination
})

const mapDispatchToProps = dispatch => ({
  setPaginationNumber: number => dispatch(setPaginationNumber(number))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
