import React, { useContext, useEffect } from 'react';
import TeamPlayerCard from './TeamPlayerCard';

//import contexts
import { TeamsContext } from '../data/TeamsContext';
import { UtilitiesContext } from '../data/UtilitiesContext';
import { PlayerTeamsContext } from '../data/PlayerTeamsContext';

const Teams: any = () => {
  const teams = useContext(TeamsContext);
  const utils = useContext(UtilitiesContext);
  const playerTeams = useContext(PlayerTeamsContext);

  return Object.keys(playerTeams.playerTeams).length > 1 ? (
    Object.entries(playerTeams.playerTeams).map(([team, players], idx) => {
      return (
        <div key={idx} className="teamPlayerTable">
          <TeamPlayerCard
            key={idx}
            team={team}
            teamIndex={players.teamID}
            players={players.players}
          />
        </div>
      );
    })
  ) : (
    <h4>Loading...</h4>
  );
};

export default Teams;
