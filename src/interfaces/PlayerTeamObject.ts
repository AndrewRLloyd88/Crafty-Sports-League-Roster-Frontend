export interface PlayerTeamObj {
  [key: string]: Player[];
}

export interface Player {
  player_name: string;
  id: number;
  team_name: string;
}
