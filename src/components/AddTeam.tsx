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
import { UtilitiesContext } from '../data/UtilitiesContext';
import { fireEvent } from '@testing-library/dom';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
    },
  },
});

const AddTeam = () => {
  const [isAddingTeam, setIsAddingTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const teams = useContext(TeamsContext);
  const utilites = useContext(UtilitiesContext);
  const classes = useStyles();

  const toggleAddTeam = () => {
    setIsAddingTeam(!isAddingTeam);
  };

  // watches for changes from the Team name input field
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setTeamName(event.target.value);
    }
  };

  const checkIfDuplicateName = (teamName: string): boolean => {
    const teamNames = teams.teams;
    for (let key in teamNames) {
      const team = teamNames[key];
      if (team.team_name === teamName) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    teamName: string,
  ) => {
    event.preventDefault();
    if (checkIfDuplicateName(teamName)) {
      utilites.handleErrorAlertOpen('team');
      return;
    }
    utilites.createTeam(teamName);

    resetAndHideForm();
  };

  const resetAndHideForm = () => {
    setIsAddingTeam(false);
    setTeamName('');
  };

  return isAddingTeam ? (
    <TableContainer component={Paper}>
      <form onSubmit={(event) => handleSubmit(event, teamName)}>
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
                  value={teamName}
                  onChange={(event) => handleChange(event)}
                  placeholder="Enter Team name"
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
                    toggleAddTeam();
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
      onClick={toggleAddTeam}
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
              Add Team
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

export default AddTeam;
