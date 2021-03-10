import React from 'react';
import type { PlayerObject } from '../interfaces/PlayerObject';
import TableCell from '@material-ui/core/TableCell';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </>
  );
};

export default PlayerCard;
