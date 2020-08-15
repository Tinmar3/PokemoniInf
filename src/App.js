import React from 'react'
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './Pages/Home/Home'
import PokemonDetails from './Pages/PokemonDetails/PokemonDetailsContainer'
import MyPokemon from './Pages/MyPokemon/MyPokemonContainer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './Store/Reducers'

const store = createStore(rootReducer)

function App () {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
