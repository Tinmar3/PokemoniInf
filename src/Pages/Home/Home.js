import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.scss'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemonItems: [],
      paginationList: [],
      paginationActive: 1,
      showLoader: false
    }
    this.ITEMS_LIMIT_PER_PAGE = 100
  }

  componentDidMount () {
    this.setState({ showLoader: true }, () => {
      this.apiListingBuilder()
        .then(res => {
          this.allPokemonItemsCount = res.data.count
          this.setState({ pokemonItems: res.data.results, paginationList: this.getPaginationList(this.allPokemonItemsCount), showLoader: false })
        }).catch(err => {
          console.error(err)
        })
    })
  }

  apiListingBuilder ({ paginationNumber } = {}) {
    const params = new URLSearchParams()
    params.append('limit', this.ITEMS_LIMIT_PER_PAGE)
    paginationNumber && paginationNumber > 1 && params.append('offset', this.ITEMS_LIMIT_PER_PAGE * (paginationNumber - 1))
    return axios.get('https://pokeapi.co/api/v2/pokemon', { params: params })
  }

  getPaginationList (pokemonItemsCount) {
    const pagesNumber = Math.ceil(pokemonItemsCount / this.ITEMS_LIMIT_PER_PAGE)
    const paginationList = []
    for (let i = 1; i <= pagesNumber; i++) paginationList.push(i)
    return paginationList
  }

  handlePaginationClick = paginationNumber => {
    const { paginationActive } = this.state
    if (paginationNumber !== paginationActive) {
      this.setState({ showLoader: true }, () => {
        this.apiListingBuilder({ paginationNumber })
          .then(res => {
            this.setState({ pokemonItems: res.data.results, paginationActive: paginationNumber, showLoader: false })
          }).catch(err => {
            console.error(err)
          })
      })
    }
  }

  render () {
    const { pokemonItems, paginationList, paginationActive, showLoader } = this.state
    return (
      <div className="container home">
        <div className="home__PokemonListWrap">
          {!showLoader ? !!pokemonItems.length && <ul className="home__PokemonList">
            {pokemonItems.map(pokemonItem =>
              <li key={pokemonItem.name}> <Link to={'pokemonDetails/' + pokemonItem.name}>{pokemonItem.name}</Link> </li>
            )}
          </ul> : <div className="loader"></div>}
        </div>
        {!!paginationList.length && paginationActive && <div className="home__Pagination">
          <span className="home__PaginationTitle">Pages: </span>
          <ul className="home__PaginationList">
            {paginationList.map(num =>
              <li key={num} className={num === paginationActive ? 'active' : ''} onClick={() => this.handlePaginationClick(num)}>{num}</li>
            )}
          </ul>
        </ div>}
      </div>
    )
  }
}
