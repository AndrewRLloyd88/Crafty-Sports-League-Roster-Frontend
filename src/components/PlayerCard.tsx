import React from 'react';
import type { PlayerObject } from '../interfaces/PlayerObject';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface Props {
  player: PlayerObject;
}

const PlayerCard = (props: Props) => {
  const { player_name, team_name } = props.player;
  return (
    <>
      <TableCell component="th" scope="row">
        {player_name}
      </TableCell>
      <TableCell>{team_name}</TableCell>
      <TableCell>
        <button>Delete Player</button>
      </TableCell>
    </>
  );
};

export default PlayerCard;
