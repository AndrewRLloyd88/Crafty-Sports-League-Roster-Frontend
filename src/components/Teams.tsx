import React, { useContext, useEffect } from 'react';
import { TeamsContext } from '../data/TeamsContext';

const Teams: any = () => {
  const teams = useContext(TeamsContext);
  console.log(teams);

  return Object.keys(teams.teams).length > 1 ? (
    teams.teams.map((team, idx) => {
      return <div key={idx}>{team.team_name}</div>;
    })
  ) : (
    <div>Loading...</div>
  );
};

export default Teams;
