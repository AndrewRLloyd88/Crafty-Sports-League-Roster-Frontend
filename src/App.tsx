import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Teams from './components/Teams';
import Players from './components/Players';

import './App.css';

interface AppProps {}

function App({}: AppProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Teams} />
        <Route exact path="/players" component={Players} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
