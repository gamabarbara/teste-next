import React, { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function signIn(email, password) {
    const { response } = await LoginRequest(email, password);

    const payload = { token: response.token, email };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }
  return (
    <AuthContext.Provider value={{ ...user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
