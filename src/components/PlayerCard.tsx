import React, { useState, useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

// import contexts
import { TeamsContext } from '../data/TeamsContext';
import { UtilitiesContext } from '../data/UtilitiesContext';

interface Props {
  player: PlayerObject;
}

const PlayerCard = (props: Props) => {
  const [addPlayerToTeam, setAddPlayerToTeam] = useState(false);
  const teams = useContext(TeamsContext);
  const updateUtility = useContext(UtilitiesContext);
  const { player_name, team_name, id } = props.player;
  return (
    <>
      <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
        {player_name}
      </TableCell>
      <TableCell style={{ textAlign: 'center' }}>
        {team_name ? (
          team_name
        ) : addPlayerToTeam ? (
          <div className="update-player">
            <select
              className="player-select"
              name="teams"
              id="teams"
              onChange={(event) => {
                const teamId = event.target.value;
                updateUtility.updatePlayerTeam(player.id, teamId);
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
            <div className="button-group">
              <button className="confirm">Confirm</button>
              <button
                onClick={() => {
                  setAddPlayerToTeam(false);
                }}
                className="cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              setAddPlayerToTeam(true);
            }}
          >
            Add To Team
          </button>
        )}
      </TableCell>
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
