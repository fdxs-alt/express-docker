import React, { useEffect, useState } from "react";
import Routes from "./routes/Routes";
import { GATEWAY_URL } from "./utils/constants";
import isAuth from "./graphql/isAuth";
const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAuthState = async () => {
      setLoading(true);
      try {
        const response = await fetch(GATEWAY_URL + "/auth", {
          credentials: "include",
          method: "GET",
        });
        const data = await response.json();
        isAuth(data.auth);
      } catch (error) {
        isAuth(false);
      }
      setLoading(false);
    };
    getAuthState();
  }, []);

  if (loading) return null;

  return <Routes />;
};

export default App;
