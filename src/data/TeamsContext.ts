import React, { createContext, Dispatch, SetStateAction } from 'react';
import type { TeamsObject } from '../interfaces/TeamsObject';

export interface ContextState {
  players: Array<TeamsObject>;
  setTeams: Dispatch<SetStateAction<any>>;
}

export const TeamsContext = createContext<ContextState>({} as ContextState);
