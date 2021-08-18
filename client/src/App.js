import './App.css';
import React from 'react';

// Para poder establecer rutas (ya tengo el browser router en index)
import { Route } from "react-router-dom";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Importo los componentes
import LandingPage from './components/LandingPage/LandingPage.js';
import Home from './components/Home/Home.js';
import PokeDetail from './components/PokeDetail/PokeDetail.js';
import PokeCreate from './components/PokeCreate/PokeCreate.js';

function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path="/pokeDetail/:id" component={PokeDetail} />
      <Route exact path="/create" component={PokeCreate} />
    </React.Fragment>
  );
}

export default App;
