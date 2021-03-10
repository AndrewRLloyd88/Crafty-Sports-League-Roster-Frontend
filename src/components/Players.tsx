import React from 'react';
import { PlayersContext } from '../data/PlayersContext';
import PlayerCard from './PlayerCard';

const Players = () => {
  return (
    <PlayersContext.Consumer>
      {(players) =>
        players && (
          <div>
            {players.players.map((player) => {
              return (
                <>
                  <PlayerCard player={player} />
                </>
              );
            })}
          </div>
        )
      }
    </PlayersContext.Consumer>
  );
};

export default Players;
