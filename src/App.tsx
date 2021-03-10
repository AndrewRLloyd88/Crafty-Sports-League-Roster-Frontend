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
import { UtilitiesContext } from './data/UtilitiesContext';

interface AppProps {}

function App({}: AppProps) {
  const [players, setPlayers] = useState({} as PlayerObject[]);

  //takes in a term such as player/team and an id then performs delete
  const deleteEntity = (id: number, term: string) => {
    if (term) {
      axios.delete(`http://localhost:3000/${term}/${id}`).then((res) => {
        console.log(res);
      });
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3000/players').then((res: AxiosResponse) => {
      const data: Array<PlayerObject> = res.data;
      setPlayers(data);
    });
  }, []);

  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
      <UtilitiesContext.Provider value={{ deleteEntity }}>
        <Navbar />
        <BrowserRouter>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Teams} />
              <Route exact path="/players" component={Players} />
            </Switch>
          </div>
        </BrowserRouter>
      </UtilitiesContext.Provider>
    </PlayersContext.Provider>
  );
}

export default App;
