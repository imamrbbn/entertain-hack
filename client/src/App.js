import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Navigation from './components/Navigation'
import Home from './pages/Home'
import AddMovie from './pages/AddMovie'
import Detail from './pages/Detail'
import Movies from './pages/Movies'
import Edit from './pages/Edit'
import TvSeries from './pages/TvSeries'
import Favorites from './pages/Favorites'
import './App.css';

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/movies" component={Movies}/>
            <Route exact path="/tv-series" component={TvSeries}/>
            <Route path="/movies/add" component={AddMovie}/>
            <Route exact path="/movies/:id" component={Detail}/>
            <Route path="/movies/:id/edit" component={Edit}/>
            <Route path="/favorites" component={Favorites}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
