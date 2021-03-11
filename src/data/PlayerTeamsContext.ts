import { createContext, Dispatch, SetStateAction } from 'react';
import type { PlayerTeamObj } from '../interfaces/PlayerTeamObject';

interface ContextState {
  playerTeams: PlayerTeamObj;
  setPlayerTeams: Dispatch<SetStateAction<any>>;
}

export const PlayerTeamsContext = createContext<ContextState>(
  {} as ContextState,
);
