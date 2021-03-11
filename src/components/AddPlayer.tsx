import React, { useState } from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//import types
import type { ChangeEvent } from 'react';

const AddPlayer = () => {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [teamName, setTeamName] = useState('');

  const toggleAddPlayer = () => {
    setIsAddingPlayer(!isAddingPlayer);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setPlayerName(event.target.value);
    }
  };

  return isAddingPlayer ? (
    <TableContainer component={Paper}>
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
                placeholder="enter player name"
              ></input>
            </TableCell>
            <TableCell
              style={{
                width: '30vw',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              <select></select>
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
              <button onClick={toggleAddPlayer}>Cancel</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </table>
    </TableContainer>
  ) : (
    <TableContainer component={Paper} onClick={toggleAddPlayer}>
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
