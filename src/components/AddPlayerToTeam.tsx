import React, { useState, useContext, useEffect } from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelIcon from '@material-ui/icons/Cancel';

//import context
import { PlayersContext } from '../data/PlayersContext';
import { TeamsContext } from '../data/TeamsContext';
import { UtilitiesContext } from '../data/UtilitiesContext';

interface Props {
  teamID: number;
}

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
    },
  },
});

const AddPlayerToTeam = (props: Props) => {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [playerId, setPlayerId] = useState(0);
  const [playersWithNoTeam, setPlayersWithNoTeam] = useState<Player[]>([]);
  const players = useContext(PlayersContext);
  const teams = useContext(TeamsContext);
  const utilites = useContext(UtilitiesContext);
  const classes = useStyles();

  const toggleAddPlayer = () => {
    setIsAddingPlayer(!isAddingPlayer);
  };

  //handles changing player in the select
  const changePlayer = (id: string) => {
    const numID = parseInt(id);
    setPlayerId(numID);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    playerId: number,
    teamID: number,
  ) => {
    event.preventDefault();
    utilites.updatePlayerTeam(playerId, teamID, 'Added');

    resetAndHideForm();
  };

  const resetAndHideForm = () => {
    setIsAddingPlayer(false);
  };

  const findPlayersWithoutTeam = () => {
    const teamlessPlayers: Player[] = [];
    const playerArray = players.players;
    playerArray.forEach((player) => {
      if (player.team_name === null) {
        teamlessPlayers.push(player);
        console.log(teamlessPlayers);
      }
    });
    setPlayersWithNoTeam(teamlessPlayers);
  };

  useEffect(() => {
    if (players.players.length > 1) {
      findPlayersWithoutTeam();
    }
  }, []);

  return isAddingPlayer ? (
    <TableContainer component={Paper}>
      <form onSubmit={(event) => handleSubmit(event, playerId, props.teamID)}>
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
                <select
                  onChange={(event) => {
                    const playerId = event.target.value;
                    changePlayer(playerId);
                  }}
                >
                  {playersWithNoTeam.map((player, idx) => {
                    return (
                      <option key={idx + 1} value={player.id}>
                        {player.player_name}
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
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DoneOutlineIcon />}
                >
                  Confirm
                </Button>
              </TableCell>

              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    toggleAddPlayer();
                    resetAndHideForm();
                  }}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </table>
      </form>
    </TableContainer>
  ) : (
    <TableContainer
      component={Paper}
      onClick={() => {
        findPlayersWithoutTeam();
        toggleAddPlayer();
      }}
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

export default AddPlayerToTeam;
