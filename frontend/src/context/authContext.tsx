import React from "react";

function noop() {}

export const AuthContext = React.createContext<ContextProps>({
  token: null,
  userId: null,
  login: noop(),
  logout: noop(),
  isAuth: false,
});
