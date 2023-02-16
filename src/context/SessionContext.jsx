import { createContext, useState } from "react";

const SessionContext = createContext();

const initialSession = JSON.parse(window.localStorage.getItem("session"));

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(initialSession);
  const [isLoading, setIsLoading] = useState(false);

  const sessionLogin = (newSession) => {
    setSession(newSession);
    window.localStorage.setItem("session", JSON.stringify(newSession));
  }

  const sessionLogout = () => {
    setSession(null);
    window.localStorage.removeItem("session");
  }

  const data = { session, sessionLogin, sessionLogout, isLoading, setIsLoading }

  return <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
}

export { SessionProvider };
export default SessionContext;