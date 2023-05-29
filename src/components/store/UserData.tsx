import { createContext } from 'react';

interface UserDataValue {
  user:Object
}

export const UserData = createContext<any | null>(null);
