//helper function to build an object containing players and the teams they belong to
const buildPlayerTeams = (teams: TeamsObject[], players: PlayerObject[]) => {
  let playerTeamObj: PlayerTeamObj = {};
  for (let keys in teams) {
    const teamNames = teams[keys].team_name;
    (playerTeamObj[teamNames] = {
      teamID: teams[keys].id,
      players: [],
    }),
      {
        teamID: teams[keys].id,
      };
  }
  return addPlayersToTeams(playerTeamObj, players);
};

//helper function responsible for adding each player to a team
const addPlayersToTeams = (
  playerTeams: PlayerTeamObj,
  players: PlayerObject[],
): PlayerTeamObj => {
  const tempPlayerTeams = playerTeams;
  for (let key in players) {
    const playerTeamNames = players[key].team_name;
    const playerData = players[key];

    if (tempPlayerTeams.hasOwnProperty(playerTeamNames)) {
      tempPlayerTeams[playerTeamNames].players.push(playerData);
    }
  }
  return tempPlayerTeams;
};

export { buildPlayerTeams };
