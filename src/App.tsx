import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

//import components
import Teams from './components/Teams';
import Players from './components/Players';
import Navbar from './components/Navbar';

//import interfaces
import type { PlayerObject } from './interfaces/PlayerObject';

//import context
import { PlayersContext } from './data/PlayersContext';

interface AppProps {}

function App({}: AppProps) {
  const [players, setPlayers] = useState({} as PlayerObject[]);

  useEffect(() => {
    axios.get('http://localhost:3000/players').then((res: AxiosResponse) => {
      const data: Array<PlayerObject> = res.data;
      console.log(res.data);
      console.log(data);
      setPlayers(data);
    });
  }, []);

  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
      <Navbar />
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Teams} />
            <Route exact path="/players" component={Players} />
          </Switch>
        </div>
      </BrowserRouter>
    </PlayersContext.Provider>
  );
}

export default App;
