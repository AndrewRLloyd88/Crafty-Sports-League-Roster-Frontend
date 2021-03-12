import React, { useState, useContext } from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

//import types
import type { ChangeEvent } from 'react';

//import context
import { TeamsContext } from '../data/TeamsContext';
import { PlayersContext } from '../data/PlayersContext';
import { UtilitiesContext } from '../data/UtilitiesContext';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
    },
  },
});

const AddPlayer = () => {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [teamId, setTeamId] = useState(0);
  const teams = useContext(TeamsContext);
  const players = useContext(PlayersContext);
  const utilites = useContext(UtilitiesContext);
  const classes = useStyles();

  const toggleAddPlayer = () => {
    setIsAddingPlayer(!isAddingPlayer);
  };

  // watches for changes from the player name input field
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setPlayerName(event.target.value);
    }
  };

  const checkIfDuplicatePlayerName = (playerName: string): boolean => {
    const playerNames = players.players;
    for (let key of playerNames) {
      if (key.player_name === playerName) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    playerName: string,
    teamId: number | null,
  ) => {
    event.preventDefault();
    if (checkIfDuplicatePlayerName(playerName)) {
      utilites.handleErrorAlertOpen('player');
      return;
    }

    teamId === 0
      ? utilites.createPlayer(playerName, null)
      : utilites.createPlayer(playerName, teamId);
    resetAndHideForm();
  };

  const changeTeam = (id: string) => {
    const numID = parseInt(id);
    setTeamId(numID);
  };

  const resetAndHideForm = () => {
    setIsAddingPlayer(false);
    setPlayerName('');
    setTeamId(0);
  };

  return isAddingPlayer ? (
    <TableContainer component={Paper}>
      <form onSubmit={(event) => handleSubmit(event, playerName, teamId)}>
        <table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Player Name
              </TableCell>
              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Team Name
              </TableCell>
              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Confirm
              </TableCell>
              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Cancel
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                <input
                  value={playerName}
                  onChange={(event) => handleChange(event)}
                  placeholder="Enter Player Name"
                  required={true}
                ></input>
              </TableCell>
              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                <select
                  name="teams"
                  id="teams"
                  onChange={(event) => {
                    const teamId = event.target.value;
                    changeTeam(teamId);
                  }}
                >
                  <option key={0} value={0}>
                    Unlisted
                  </option>
                  {teams.teams.map((team, idx) => {
                    return (
                      <option key={idx + 1} value={idx + 1}>
                        {team.team_name}
                      </option>
                    );
                  })}
                </select>
              </TableCell>
              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                <button>Confirm</button>
              </TableCell>

              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                <button
                  onClick={() => {
                    toggleAddPlayer();
                    resetAndHideForm();
                  }}
                >
                  Cancel
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </table>
      </form>
    </TableContainer>
  ) : (
    <TableContainer
      component={Paper}
      onClick={toggleAddPlayer}
      className={classes.root}
    >
      <table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                width: '30vw',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            ></TableCell>
            <TableCell
              style={{
                width: '30vw',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Add Player
            </TableCell>
            <TableCell
              style={{
                width: '30vw',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            ></TableCell>
          </TableRow>
        </TableHead>
      </table>
    </TableContainer>
  );
};

export default AddPlayer;
