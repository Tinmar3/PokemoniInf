/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MyPokemon.scss'

export default class MyPokemon extends Component {
  render () {
    const { myPokemon, removeFromMyPokemon } = this.props
    return (
      <div className="container myPokemon">
        <h1>My Pokemon</h1>
        { myPokemon.length ? <ul className="myPokemon__List">{myPokemon.map(pokemon =>
          <li key={ pokemon.name }>
            <Link to={'pokemonDetails/' + pokemon.name}>
              <img src={pokemon.imgUrl} />
              <span>{ pokemon.name }</span>
            </Link>
            <span className="myPokemon__Remove" title="Remove from My Pokemon" onClick={ () => removeFromMyPokemon(pokemon.name) }>&times;</span>
          </li>
        )}</ul>
          : <p>Your Pokemon list seems to be empty. Go to homepage and add some Pokemons!</p> }
      </div>
    )
  }
}
