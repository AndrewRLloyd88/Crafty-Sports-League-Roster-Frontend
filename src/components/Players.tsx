import React from 'react';
import { PlayersContext } from '../data/PlayersContext';
import PlayerCard from './PlayerCard';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Players = () => {
  return (
    <>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Player Name</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Remove Player</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <PlayersContext.Consumer>
            {(players) =>
              players && (
                <>
                  {players.players.map((player) => {
                    return (
                      <TableRow>
                        <PlayerCard player={player} />
                      </TableRow>
                    );
                  })}
                </>
              )
            }
          </PlayersContext.Consumer>
        </TableBody>
      </TableContainer>
    </>
  );
};

export default Players;
