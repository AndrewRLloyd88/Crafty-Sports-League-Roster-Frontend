import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
  const [alertOpen, setAlertOpen] = useState(false);

  //takes in a term such as player/team and an id then performs delete
  const deleteEntity = (id: number, term: string) => {
    if (term) {
      axios.delete(`http://localhost:3000/${term}/${id}`).then((res) => {
        console.log(res);
        getPlayers();
        setAlertOpen(true);
      });
    }
  };

  const getPlayers = () => {
    axios.get('http://localhost:3000/players').then((res: AxiosResponse) => {
      const data: Array<PlayerObject> = res.data;
      setPlayers(data);
    });
  };

  //Alert logic
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <BrowserRouter>
      <PlayersContext.Provider value={{ players, setPlayers }}>
        <UtilitiesContext.Provider value={{ deleteEntity }}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Teams} />
              <Route exact path="/players" component={Players} />
            </Switch>
            <Snackbar
              open={alertOpen}
              autoHideDuration={3000}
              onClose={handleAlertClose}
            >
              <Alert severity="success" onClose={handleAlertClose}>
                Player Deleted
              </Alert>
            </Snackbar>
          </div>
        </UtilitiesContext.Provider>
      </PlayersContext.Provider>
    </BrowserRouter>
  );
}

export default App;
