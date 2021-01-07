import React, { createContext, useContext, useState, useEffect } from "react";
import { GATEWAY_URL } from "../utils/constants";

const SessionCtx = createContext(null);

const SessionCtxProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const getAuthState = async () => {
      setLoading(true);
      try {
        const response = await fetch(GATEWAY_URL + "/auth", {
          credentials: "include",
          method: "GET",
        });
        const data = await response.json();
        setIsAuth(data.auth);
      } catch (error) {
        setIsAuth(false);
      }
      setLoading(false);
    };
    getAuthState();
  }, []);

  if (loading) return null;
  else
    return (
      <SessionCtx.Provider value={{ isAuth, setIsAuth }}>
        {children}
      </SessionCtx.Provider>
    );
};

export default SessionCtxProvider;

export const useSessionContext = () => useContext(SessionCtx);
