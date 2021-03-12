import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { UtilitiesContext } from '../data/UtilitiesContext';

interface Props {
  player: PlayerObject;
}

const PlayerCard = (props: Props) => {
  const { player_name, team_name, id } = props.player;
  return (
    <>
      <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
        {player_name}
      </TableCell>
      <TableCell style={{ textAlign: 'center' }}>{team_name}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>
        <UtilitiesContext.Consumer>
          {(deleteUtility) =>
            deleteUtility && (
              <>
                <IconButton
                  onClick={() => {
                    deleteUtility.deleteEntity(id, 'players');
                  }}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )
          }
        </UtilitiesContext.Consumer>
      </TableCell>
    </>
  );
};

export default PlayerCard;
