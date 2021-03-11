import React from 'react';
import { PlayersContext } from '../data/PlayersContext';
import PlayerCard from './PlayerCard';
import Table from '@material-ui/core/TableBody';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Players = () => {
  return (
    <div className="playersTable">
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
                Team
              </TableCell>
              <TableCell
                style={{
                  width: '30vw',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Remove Player
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <PlayersContext.Consumer>
              {(players) =>
                players && (
                  <>
                    {players.players.map((player, idx) => {
                      return (
                        <TableRow key={idx}>
                          <PlayerCard player={player} key={idx} />
                        </TableRow>
                      );
                    })}
                  </>
                )
              }
            </PlayersContext.Consumer>
          </TableBody>
        </table>
      </TableContainer>
    </div>
  );
};

export default Players;
