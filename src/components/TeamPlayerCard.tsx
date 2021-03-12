import React, { useEffect, useContext } from 'react';

// import MUI specific modules
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

//import context
import { UtilitiesContext } from '../data/UtilitiesContext';

//props
interface Props {
  team: string;
  players: PlayerObject[];
  teamIndex: number;
}

//style for table
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },
});

const TeamPlayerCard = (props: Props) => {
  const { team, players, teamIndex } = props;
  const classes = useStyles();

  useEffect(() => {}, [props]);

  return (
    <Card>
      <CardContent>
        <Typography
          className={`team-header ${classes.title}`}
          color="textPrimary"
          gutterBottom
        >
          {team.toString()}
          <UtilitiesContext.Consumer>
            {(deleteUtility) =>
              deleteUtility && (
                <>
                  <Button
                    onClick={() => {
                      deleteUtility.deleteEntity(teamIndex, 'teams');
                    }}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete Team
                  </Button>
                </>
              )
            }
          </UtilitiesContext.Consumer>
        </Typography>
        <TableContainer component={Paper}>
          <table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: '50vw',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Player Name
                </TableCell>
                <TableCell
                  style={{
                    width: '50vw',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Remove Player From Team
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell
                      style={{ textAlign: 'center' }}
                      component="th"
                      scope="row"
                    >
                      {player.player_name}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <UtilitiesContext.Consumer>
                        {(deleteUtility) =>
                          deleteUtility && (
                            <>
                              <IconButton
                                onClick={() => {
                                  deleteUtility.deleteEntity(
                                    teamIndex,
                                    'teams',
                                  );
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
                  </TableRow>
                );
              })}
            </TableBody>
          </table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TeamPlayerCard;
