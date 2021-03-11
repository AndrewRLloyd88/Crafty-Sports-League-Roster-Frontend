import React, { useState, useEffect, useCallback } from 'react';
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
import type { PlayerTeamObj } from './interfaces/PlayerTeamObject';

//import context
import { PlayersContext } from './data/PlayersContext';
import { TeamsContext } from './data/TeamsContext';
import { UtilitiesContext } from './data/UtilitiesContext';
import { PlayerTeamsContext } from './data/PlayerTeamsContext';

interface AppProps {}

function App({}: AppProps) {
  //states
  const [players, setPlayers] = useState({} as PlayerObject[]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [teams, setTeams] = useState({} as TeamsObject[]);
  const [playerTeams, setPlayerTeams] = useState({});
  let teamLength = Object.keys(teams).length;
  let playerLength = Object.keys(players).length;

  //takes in a term such as player/team and an id then performs delete
  const deleteEntity = (id: number, term: string) => {
    console.log(id, term);
    if (term) {
      axios
        .delete(`http://localhost:3000/${term}/${id}`)
        .then((res) => {
          getPlayers();
          getTeams();
          buildPlayerTeams();
          setAlertOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //creates a new player based on user input
  const createPlayer = (playerName: string, teamID: number) => {
    console.log(playerName, teamID);
  };

  //getters for main entities
  const getTeams = () => {
    console.log('trigger 1');
    axios.get('http://localhost:3000/teams').then((res: AxiosResponse) => {
      const data: Array<TeamsObject> = res.data;
      setTeams(data);
    });
  };

  const getPlayers = () => {
    console.log('trigger 2');
    axios.get('http://localhost:3000/players').then((res: AxiosResponse) => {
      const data: Array<PlayerObject> = res.data;
      setPlayers(data);
    });
  };

  //helper function to build an object containing players and the teams they belong to
  const buildPlayerTeams = () => {
    console.log('trigger 3');
    let playerTeamObj: PlayerTeamObj = {};
    for (let keys in teams) {
      const teamNames = teams[keys].team_name;
      playerTeamObj[teamNames] = {
        teamID: teams[keys].id,
        players: [],
      };
    }
    addPlayersToTeams(playerTeamObj);
  };

  //helper function responsible for adding each player to a team
  const addPlayersToTeams = (playerTeams: PlayerTeamObj) => {
    console.log('trigger 4');
    const tempPlayerTeams = playerTeams;
    for (let key in players) {
      const playerTeamNames = players[key].team_name;
      if (tempPlayerTeams.hasOwnProperty(playerTeamNames)) {
        tempPlayerTeams[playerTeamNames].players.push(players[key]);
      }
      console.log(tempPlayerTeams);
    }
    setPlayerTeams(tempPlayerTeams);
  };

  //Alert logic
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    getTeams();
    getPlayers();
    buildPlayerTeams();
  }, [teamLength, playerLength]);

  return (
    <BrowserRouter>
      <TeamsContext.Provider value={{ teams, setTeams }}>
        <PlayersContext.Provider value={{ players, setPlayers }}>
          <PlayerTeamsContext.Provider value={{ playerTeams, setPlayerTeams }}>
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
}

export default App;
