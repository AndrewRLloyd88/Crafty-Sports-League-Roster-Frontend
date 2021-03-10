import React, { createContext } from 'react';

interface UtilObject {
  deleteEntity: (id: number, term: string) => void;
}

export const UtilitiesContext = createContext<UtilObject>({} as UtilObject);
