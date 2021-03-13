import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

//import components
import Teams from './components/Teams';
import Players from './components/Players';
import ShowPlayer from './components/ShowPlayer';
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
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [teams, setTeams] = useState({} as TeamsObject[]);
  const [playerTeams, setPlayerTeams] = useState({});
  const [update, setUpdate] = useState(false);
  const [alertAction, setAlertAction] = useState('');
  const [entity, setEntity] = useState('');
  let teamLength = Object.keys(teams).length;
  let playerLength = Object.keys(players).length;

  //getters for main entities
  const getTeams = () => {
    console.log('get teams');
    axios
      .get('https://crafty-sports-league-backend.herokuapp.com/teams')
      .then((res: AxiosResponse) => {
        const data: Array<TeamsObject> = res.data;
        setTeams(data);
      });
  };

  const getPlayers = () => {
    console.log('get players');
    axios
      .get('https://crafty-sports-league-backend.herokuapp.com/players')
      .then((res: AxiosResponse) => {
        const data: Array<PlayerObject> = res.data;
        setPlayers(data);
      });
  };

  //setters
  const createPlayer = (playerName: string, teamID: number | null) => {
    axios
      .post('https://crafty-sports-league-backend.herokuapp.com/players', {
        playerName,
        teamID,
      })
      .then((res: AxiosResponse) => {
        const data: Array<PlayerObject> = res.data;
        setPlayers(data);
        setAlertAction('Added');
        setAlertOpen(true);
      });
  };

  //create a team
  const createTeam = (teamName: string) => {
    setAlertAction('Added');
    setAlertOpen(true);
    axios
      .post('https://crafty-sports-league-backend.herokuapp.com/teams', {
        teamName,
      })
      .then((res) => {
        setTeams(res.data);
      });
  };

  //update methods
  const updatePlayerTeam = (
    player_id: number,
    team_id: number | null,
    action: string,
  ) => {
    setUpdate(true);
    axios
      .put(
        `https://crafty-sports-league-backend.herokuapp.com/players/update/team`,
        {
          player_id,
          team_id,
        },
      )
      .then((res) => {
        getPlayers();
        getTeams();
        setUpdate(true);
        setAlertAction(action);
        setAlertOpen(true);
        setUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //takes in a term such as player/team and an id then performs delete
  const deleteEntity = (id: number | null, term: string) => {
    if (term) {
      axios
        .delete(`/${term}/${id}`)
        .then((res) => {
          getPlayers();
          getTeams();
          setPlayerTeams(buildPlayerTeams(teams, players));
          setAlertAction('Deleted');
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

  const handleErrorAlertOpen = (entity: string) => {
    setEntity(entity);
    setErrorAlertOpen(true);
  };

  //error card
  const handleErrorAlertClose = () => {
    setErrorAlertOpen(false);
  };

  useEffect(() => {
    const rebuildPlayerTeam = () => {
      setPlayerTeams(buildPlayerTeams(teams, players));
    };

    if (alertOpen && update) {
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
                createTeam,
                updatePlayerTeam,
                handleErrorAlertOpen,
              }}
            >
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Teams} />
                  <Route exact path="/players" component={Players} />
                  <Route exact path="/player" component={ShowPlayer} />
                </Switch>
                {/* success alert */}
                <Snackbar
                  open={alertOpen}
                  autoHideDuration={3000}
                  onClose={handleAlertClose}
                >
                  <Alert severity="success" onClose={handleAlertClose}>
                    Successfully {alertAction}
                  </Alert>
                </Snackbar>
                {/* error alert */}
                <Snackbar
                  open={errorAlertOpen}
                  autoHideDuration={3000}
                  onClose={handleErrorAlertClose}
                >
                  <Alert severity="error" onClose={handleErrorAlertClose}>
                    A {entity} with that name already exists!
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
