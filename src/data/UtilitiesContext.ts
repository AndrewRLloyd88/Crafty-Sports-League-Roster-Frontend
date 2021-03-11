import React, { createContext } from 'react';

interface UtilObject {
  deleteEntity: (id: number, term: string) => void;
  //TODO update teamName to be teamID
  createPlayer: (playerName: string, teamID: number) => void;
}

export const UtilitiesContext = createContext<UtilObject>({} as UtilObject);
