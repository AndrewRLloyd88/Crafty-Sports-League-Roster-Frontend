interface PlayerObject {
  player_name: string;
  team_name: string;
  id: number;
}

interface PlayerTeamObj {
  [key: string]: {
    teamID: number | null;
    players: Player[];
  };
}

interface Player {
  player_name: string;
  id: number;
  team_name: string;
}

interface TeamsObject {
  team_name: string;
  id: number;
}

interface Players {
  players: Array<PlayerObject>;
  setPlayers: Dispatch<SetStateAction<any>>;
}

interface Teams {
  teams: Array<TeamsObject>;
  setTeams: Dispatch<SetStateAction<any>>;
}

interface PlayerTeamInterface {
  playerTeams: PlayerTeamObj;
  setPlayerTeams: Dispatch<SetStateAction<any>>;
}

interface UtilObject {
  deleteEntity: (id: number | null, term: string) => void;
  createPlayer: (playerName: string, teamID: number | null) => void;
  updatePlayerTeam: (player_id: number, team_id: number | null) => void;
  createTeam: (teamName: string) => void;
  handleErrorAlertOpen: (entity: string) => void;
}
