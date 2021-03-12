import { createContext, Dispatch, SetStateAction } from 'react';

export const PlayerTeamsContext = createContext<PlayerTeamInterface>(
  {} as PlayerTeamInterface,
);
