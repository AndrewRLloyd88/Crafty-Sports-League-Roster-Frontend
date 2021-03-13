import React, { useContext, useEffect } from 'react';
import TeamPlayerCard from './TeamPlayerCard';

//import contexts
import { PlayerTeamsContext } from '../data/PlayerTeamsContext';

//impot components
import AddTeam from './AddTeam';

const Teams: any = () => {
  const playerTeams = useContext(PlayerTeamsContext);

  return (
    <>
      <AddTeam />
      {Object.keys(playerTeams.playerTeams).length > 1 ? (
        Object.entries(playerTeams.playerTeams).map(([team, players], idx) => {
          return (
            <div key={`div + ${idx} `} className="teamPlayerTable">
              <TeamPlayerCard
                key={idx}
                team={team}
                teamIndex={players.teamID}
                players={players.players}
                teamID={idx + 1}
              />
            </div>
          );
        })
      ) : (
        <h4>Loading...</h4>
      )}
    </>
  );
};

export default Teams;
