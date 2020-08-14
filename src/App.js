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
        <nav>
          <Link to="/">HOME</Link>
          <Link to="/myPokemon">MY POKEMON</Link>
        </nav>
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
