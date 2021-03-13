import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

interface Location {
  pathname: string;
  state: [Player];
}

const ShowPlayer = () => {
  const location: Location = useLocation();
  const [results, setResults] = useState<[Player]>([{} as Player]);
  console.log(location.state);

  useEffect(() => {
    setResults(location.state);
    console.log(location);
  }, [location]);

  return results && results.length > 0 ? (
    <TableContainer component={Paper}>
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
            Team Name
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell
            style={{
              width: '40vw',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {results[0].player_name}
          </TableCell>
          <TableCell
            style={{
              width: '40vw',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {results[0].team_name}
          </TableCell>
        </TableRow>
      </TableBody>
    </TableContainer>
  ) : (
    <div>No Results Found.</div>
  );
};

export default ShowPlayer;
