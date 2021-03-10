import React from 'react';
import { PlayersContext } from '../data/PlayersContext';

const Players = () => {
  return (
    <PlayersContext.Consumer>
      {(players) =>
        players && (
          <div>
            {players.players.map((player) => {
              return (
                <>
                  <div className="playerList">
                    <div>{player.player_name}</div>
                    <div>{player.team_name}</div>
                  </div>
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
