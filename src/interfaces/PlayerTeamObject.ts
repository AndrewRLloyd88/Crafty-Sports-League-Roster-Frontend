export interface PlayerTeamObj {
  [key: string]: Player[];
}

interface Player {
  player_name: string;
  id: number;
  team_name: string;
}
