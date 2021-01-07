import React from "react";
import { Redirect } from "react-router-dom";
import { useSessionContext } from "../store/SessionStore";

const Notes = () => {
  const { isAuth } = useSessionContext();

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return <div>Notes</div>;
};

export default Notes;
