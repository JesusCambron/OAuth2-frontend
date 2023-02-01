import { createContext, useState } from "react";

const SessionContext = createContext();

const initialSession = null;

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(initialSession);

  const handleSession = (newSession) => {
    console.log(newSession);
    setSession(newSession)
  }

  const data = { session, handleSession }

  return <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
}

export { SessionProvider };
export default SessionContext;