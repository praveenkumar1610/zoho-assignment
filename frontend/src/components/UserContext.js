import React, { createContext } from 'react';

export const UserContext = createContext({
  email: '',
  id:'',
  setUser: () => {},
});
