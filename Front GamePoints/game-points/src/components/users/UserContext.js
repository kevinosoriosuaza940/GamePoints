import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};
