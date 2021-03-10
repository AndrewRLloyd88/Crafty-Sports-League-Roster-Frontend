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
      <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
        {player_name}
      </TableCell>
      <TableCell style={{ textAlign: 'center' }}>{team_name}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </>
  );
};

export default PlayerCard;
