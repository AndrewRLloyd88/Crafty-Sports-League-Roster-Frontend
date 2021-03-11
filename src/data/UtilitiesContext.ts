import React, { createContext } from 'react';

interface UtilObject {
  deleteEntity: (id: number, term: string) => void;
  //TODO update teamName to be teamID
  createEntity: (playerName: string, teamName: string) => void;
}

export const UtilitiesContext = createContext<UtilObject>({} as UtilObject);
