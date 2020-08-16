/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ITEMS_LIMIT_PER_PAGE } from '../../Conf/Const'
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
  }

  componentDidMount () {
    this.setState({ showLoader: true }, () => {
      this.apiListingBuilder()
        .then(res => {
          this.setState({ pokemonItems: res.data.results, paginationList: this.getPaginationList(res.data.count), showLoader: false })
        }).catch(err => {
          console.error(err)
        })
    })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.activePagination !== this.props.activePagination) {
      this.setState({ showLoader: true }, () => {
        this.apiListingBuilder()
          .then(res => {
            this.setState({ pokemonItems: res.data.results, showLoader: false })
          }).catch(err => {
            console.error(err)
          })
      })
    }
  }

  apiListingBuilder () {
    const { activePagination } = this.props
    const params = new URLSearchParams()
    params.append('limit', ITEMS_LIMIT_PER_PAGE)
    activePagination > 1 && params.append('offset', ITEMS_LIMIT_PER_PAGE * (activePagination - 1))
    return axios.get('https://pokeapi.co/api/v2/pokemon', { params: params })
  }

  getPaginationList (pokemonItemsCount) {
    const pagesNumber = Math.ceil(pokemonItemsCount / ITEMS_LIMIT_PER_PAGE)
    const paginationList = []
    for (let i = 1; i <= pagesNumber; i++) paginationList.push(i)
    return paginationList
  }

  handlePaginationClick = paginationNumber => {
    const { setPaginationNumber, activePagination } = this.props
    if (paginationNumber !== activePagination) setPaginationNumber(paginationNumber)
  }

  render () {
    const { pokemonItems, paginationList, showLoader } = this.state
    const { activePagination } = this.props
    return (
      <div className="container home">
        <div className="home__PokemonListWrap">
          {!showLoader ? !!pokemonItems.length && <ul className="home__PokemonList">
            {pokemonItems.map(pokemonItem =>
              <li key={pokemonItem.name}> <Link to={'pokemonDetails/' + pokemonItem.name}>{pokemonItem.name}</Link> </li>
            )}
          </ul> : <div className="loader"></div>}
        </div>
        {!!paginationList.length && activePagination && <div className="home__Pagination">
          <span className="home__PaginationTitle">Pages: </span>
          <ul className="home__PaginationList">
            {paginationList.map(num =>
              <li key={num} className={num === activePagination ? 'active' : ''} onClick={() => this.handlePaginationClick(num)}>{num}</li>
            )}
          </ul>
        </ div>}
      </div>
    )
  }
}
