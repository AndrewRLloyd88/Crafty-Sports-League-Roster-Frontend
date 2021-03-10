import React from 'react';
import type { PlayerObject } from '../interfaces/PlayerObject';

interface Props {
  player: PlayerObject;
}

const PlayerCard = (props: Props) => {
  const { player_name, team_name } = props.player;
  return (
    <div>
      <div className="playerList">
        <div>{player_name}</div>
        <div>{team_name}</div>
        <button>Delete Player</button>
      </div>
    </div>
  );
};

export default PlayerCard;
