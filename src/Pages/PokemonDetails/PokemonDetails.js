/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './PokemonDetails.scss'

class PokemonDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemonData: {},
      showLoader: false,
      mainImagePresent: undefined
    }
  }

  componentDidMount () {
    this.setState({ showLoader: true }, () => {
      axios.get('https://pokeapi.co/api/v2/pokemon/' + this.props.match.params.name)
        .then(res => {
          const { name, types, sprites, stats, moves, abilities } = res.data
          this.setState({ pokemonData: { name, types, sprites, stats, moves, abilities } })
        }).catch(err => {
          console.error(err)
        })
    })
  }

  componentDidUpdate () {
    const { mainImagePresent, pokemonData } = this.state
    if (typeof mainImagePresent === 'undefined') {
      const mainImage = pokemonData.sprites && pokemonData.sprites.other['official-artwork'].front_default
      if (mainImage) {
        this.setState({ mainImagePresent: true })
      } else if (Object.keys(pokemonData).length !== 0 && !mainImage) {
        this.setState({ mainImagePresent: false })
      }
    }
  }

  hideLoader = () => {
    this.setState({ showLoader: false })
  }

  replaceDashWithSpace (str) {
    return str && str.replace(/-/g, ' ')
  }

  render () {
    const { pokemonData, showLoader, mainImagePresent } = this.state
    const { addToMyPokemon, removeFromMyPokemon, isInMyPokemonList } = this.props
    return (
      <div className="container pokemonDetails">
        {showLoader && <div className="loader__Wrap"><div className="loader"></div></div>}
        <h1>{ this.replaceDashWithSpace(pokemonData.name) }
          { isInMyPokemonList(pokemonData.name)
            ? <span onClick={ () => removeFromMyPokemon(pokemonData.name) }>- Remove from My Pokemon</span>
            : <span onClick={ () => addToMyPokemon(pokemonData.name, pokemonData.sprites.front_default) }>+ Add to My Pokemon</span> }
        </h1>
        <div className="pokemonDetails__Wrap">
          {(mainImagePresent === true) &&
          <img className="pokemonDetails__Img" src={pokemonData.sprites.other['official-artwork'].front_default} alt={pokemonData.name} onLoad={this.hideLoader} /> }
          {(mainImagePresent === false) &&
          <img className="pokemonDetails__ImgPlacehold" src="/pokeball.png" alt="Pokemon placeholder" onLoad={this.hideLoader} onError={this.hideLoader} /> }
          {!showLoader && <ul className="pokemonDetails__List">
            {pokemonData.types && <li>
              <h5>Types</h5>
              <ul className="pokemonDetails__ItemList">{pokemonData.types.map(typeItem =>
                <li key={ typeItem.type.name }>{ typeItem.type.name }</li>
              )}</ul>
            </li>}
            {pokemonData.stats && <li>
              <h5>Stats</h5>
              <ul className="pokemonDetails__ItemList">{pokemonData.stats.map(statsItem =>
                <li key={ statsItem.stat.name }>{ statsItem.stat.name }<span>{ statsItem.base_stat }</span></li>
              )}</ul>
            </li>}
            {pokemonData.abilities && <li>
              <h5>Abilities</h5>
              <ul className="pokemonDetails__ItemList">{pokemonData.abilities.map(abilitiesItem =>
                <li key={ abilitiesItem.ability.name }>{ this.replaceDashWithSpace(abilitiesItem.ability.name) }</li>
              )}</ul>
            </li>}
            {pokemonData.moves && <li>
              <h5>Moves</h5>
              <ul className="pokemonDetails__ItemList">{pokemonData.moves.map(movesItem =>
                <li key={ movesItem.move.name }>{ this.replaceDashWithSpace(movesItem.move.name) }</li>
              )}</ul>
            </li>}
          </ul>}
        </div>
      </div>
    )
  }
}

export default withRouter(PokemonDetails)
