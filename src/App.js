import React from 'react'
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './Pages/Home'
import PokemonDetails from './Pages/PokemonDetails'
import MyPokemon from './Pages/MyPokemon'

function App () {
  return (
    <Router>
      <header>
        <div className="container">
          <Link to="/" className="header__ImgWrap">
            <img src="/pokedex.png" />
            <span>POKEDEX APP</span>
          </Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/myPokemon">My Pokemon</Link>
          </nav>
        </div>
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pokemonDetails/:name">
            <PokemonDetails />
          </Route>
          <Route path="/myPokemon">
            <MyPokemon />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default App
