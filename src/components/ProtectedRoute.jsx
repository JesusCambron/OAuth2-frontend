import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SessionContext from '../context/SessionContext'


const ProtectedRoute = ({ children, redirectTo = "/oauth/login" }) => {
  const { session } = useContext(SessionContext);
  if (!session) {
    return <Navigate to={redirectTo} />
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute