import React, { createContext, Dispatch, SetStateAction } from 'react';
import type { PlayerObject } from '../interfaces/PlayerObject';

interface ContextState {
  players: Array<PlayerObject>;
  setPlayers: Dispatch<SetStateAction<any>>;
}

export const PlayersContext = createContext<ContextState>({} as ContextState);
