import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

//import components
import Teams from './components/Teams';
import Players from './components/Players';
import Navbar from './components/Navbar';

//import context
import { PlayersContext } from './data/PlayersContext';
import { TeamsContext } from './data/TeamsContext';
import { UtilitiesContext } from './data/UtilitiesContext';
import { PlayerTeamsContext } from './data/PlayerTeamsContext';

//import helpers
import { buildPlayerTeams } from './utils/buildHelpers';

const App = () => {
  //states
  const [players, setPlayers] = useState({} as PlayerObject[]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [teams, setTeams] = useState({} as TeamsObject[]);
  const [playerTeams, setPlayerTeams] = useState({});
  const [update, setUpdate] = useState(false);
  let teamLength = Object.keys(teams).length;
  let playerLength = Object.keys(players).length;

  //getters for main entities
  const getTeams = () => {
    console.log('get teams');
    axios.get('http://localhost:3000/teams').then((res: AxiosResponse) => {
      const data: Array<TeamsObject> = res.data;
      setTeams(data);
    });
  };

  const getPlayers = () => {
    console.log('get players');
    axios.get('http://localhost:3000/players').then((res: AxiosResponse) => {
      const data: Array<PlayerObject> = res.data;
      setPlayers(data);
    });
  };

  //setters
  const createPlayer = (playerName: string, teamID: number) => {
    console.log(playerName, teamID);
  };

  //update methods
  const updatePlayerTeam = (player_id: number, team_id: number | null) => {
    setUpdate(true);
    axios
      .put(`http://localhost:3000/players/update/team`, {
        player_id,
        team_id,
      })
      .then((res) => {
        getPlayers();
        getTeams();
        setUpdate(true);
        setAlertOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePlayerName = (player_id: number, player_name: number | null) => {
    axios.put(`http://localhost:3000/players/update/team`, {
      player_id,
      player_name,
    });
  };

  //takes in a term such as player/team and an id then performs delete
  const deleteEntity = (id: number | null, term: string) => {
    if (term) {
      axios
        .delete(`http://localhost:3000/${term}/${id}`)
        .then((res) => {
          getPlayers();
          getTeams();
          setPlayerTeams(buildPlayerTeams(teams, players));
          setAlertOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Alert logic
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    const rebuildPlayerTeam = () => {
      setPlayerTeams(buildPlayerTeams(teams, players));
    };

    if (alertOpen) {
      rebuildPlayerTeam();
    }

    getTeams();
    getPlayers();
    setPlayerTeams(buildPlayerTeams(teams, players));
  }, [teamLength, playerLength, alertOpen]);

  return (
    <BrowserRouter>
      <TeamsContext.Provider value={{ teams, setTeams }}>
        <PlayersContext.Provider value={{ players, setPlayers }}>
          <PlayerTeamsContext.Provider value={{ playerTeams, setPlayerTeams }}>
            <UtilitiesContext.Provider
              value={{
                deleteEntity,
                createPlayer,
                updatePlayerTeam,
              }}
            >
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
                    Successfully Deleted
                  </Alert>
                </Snackbar>
              </div>
            </UtilitiesContext.Provider>
          </PlayerTeamsContext.Provider>
        </PlayersContext.Provider>
      </TeamsContext.Provider>
    </BrowserRouter>
  );
};

export default App;
