import React, { useContext, useEffect } from 'react';

//import contexts
import { TeamsContext } from '../data/TeamsContext';
import { UtilitiesContext } from '../data/UtilitiesContext';
import { PlayerTeamsContext } from '../data/PlayerTeamsContext';

const Teams: any = () => {
  const teams = useContext(TeamsContext);
  const utils = useContext(UtilitiesContext);
  const playerTeams = useContext(PlayerTeamsContext);
  console.log(playerTeams);

  return Object.keys(playerTeams.playerTeams).length > 1 ? (
    Object.entries(playerTeams.playerTeams).map(([team, players], idx) => {
      return (
        <>
          <div key={idx}>{team.toString()}</div>
          {players.map((player, idx) => {
            return <div key={idx}>{player.player_name}</div>;
          })}
        </>
      );
    })
  ) : (
    <h4>Loading...</h4>
  );
};

export default Teams;
