import React, { useState, useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// import contexts
import { TeamsContext } from '../data/TeamsContext';
import { UtilitiesContext } from '../data/UtilitiesContext';

interface Props {
  player: PlayerObject;
}

const PlayerCard = (props: Props) => {
  const [addPlayerToTeam, setAddPlayerToTeam] = useState(false);
  const [teamId, setTeamId] = useState(0);
  const teams = useContext(TeamsContext);
  const updateUtility = useContext(UtilitiesContext);
  const { player_name, team_name, id } = props.player;

  const changeTeam = (id: string) => {
    const numID = parseInt(id);
    setTeamId(numID);
  };

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
                changeTeam(teamId);
              }}
            >
              <option key={0} value={0}>
                Unlisted
              </option>
              {teams.teams.map((team, idx) => {
                return (
                  <option key={idx + 1} value={team.id}>
                    {team.team_name}
                  </option>
                );
              })}
            </select>
            <div className="button-group">
              <Button
                variant="contained"
                color="primary"
                startIcon={<DoneOutlineIcon />}
                onClick={() => {
                  setAddPlayerToTeam(false);
                  updateUtility.updatePlayerTeam(id, teamId, 'Added');
                }}
                className="confirm"
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={() => {
                  setAddPlayerToTeam(false);
                }}
                className="cancel"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => {
              setAddPlayerToTeam(true);
            }}
          >
            Add To Team
          </Button>
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
