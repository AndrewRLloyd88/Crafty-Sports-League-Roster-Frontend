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
import type { TeamsObject } from './interfaces/TeamsObject';

//import context
import { PlayersContext } from './data/PlayersContext';
import { TeamsContext } from './data/TeamsContext';
import { UtilitiesContext } from './data/UtilitiesContext';

interface AppProps {}

function App({}: AppProps) {
  //states
  const [players, setPlayers] = useState({} as PlayerObject[]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [teams, setTeams] = useState({} as TeamsObject[]);

  //takes in a term such as player/team and an id then performs delete
  const deleteEntity = (id: number, term: string) => {
    if (term) {
      axios
        .delete(`http://localhost:3000/${term}/${id}`)
        .then((res) => {
          getPlayers();
          setAlertOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const createPlayer = (playerName: string, teamID: number) => {
    console.log(playerName, teamID);
  };

  //getters for main entities
  const getTeams = () => {
    axios.get('http://localhost:3000/teams').then((res: AxiosResponse) => {
      const data: Array<TeamsObject> = res.data;
      setTeams(data);
    });
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
    getTeams();
    getPlayers();
  }, []);

  return (
    <BrowserRouter>
      <TeamsContext.Provider value={{ teams, setTeams }}>
        <PlayersContext.Provider value={{ players, setPlayers }}>
          <UtilitiesContext.Provider value={{ deleteEntity, createPlayer }}>
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
      </TeamsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
