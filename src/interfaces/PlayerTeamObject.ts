export interface PlayerTeamObj {
  [key: string]: {
    teamID: number;
    players: Player[];
  };
}

export interface Player {
  player_name: string;
  id: number;
  team_name: string;
}
