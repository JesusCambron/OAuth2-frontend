import { createContext, useState } from "react";

const SessionContext = createContext();

const initialSession = null;

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(initialSession);
  const [isLoading, setIsLoading] = useState(false);

  const sessionLogin = (newSession) => {
    setSession(newSession);
  }

  const sessionLogout = () => {
    setSession(null);
  }

  const data = { session, sessionLogin, sessionLogout, isLoading, setIsLoading }

  return <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
}

export { SessionProvider };
export default SessionContext;