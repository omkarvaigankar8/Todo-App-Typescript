import { createContext } from 'react';

interface UserDataValue {
  user:Object
  // Define the properties and types of the user data
  // accessToken: string;
  // Other properties...
}

export const UserData = createContext<any | null>(null);
