import React from "react";
import { createContext } from "react";

const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export { CurrentUserContext };
