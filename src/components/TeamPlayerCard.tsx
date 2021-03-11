import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//import types
import type { PlayerObject } from '../interfaces/PlayerObject';

interface Props {
  team: string;
  players: PlayerObject[];
}

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
  const { team, players } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {team.toString()}
        </Typography>
        <Typography className={classes.subtitle}>Players</Typography>
        {players.map((player, idx) => {
          return <div key={idx}>{player.player_name}</div>;
        })}
      </CardContent>
    </Card>
  );
};

export default TeamPlayerCard;
