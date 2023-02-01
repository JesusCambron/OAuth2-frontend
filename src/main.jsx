import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from "./routes/Routes"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CLIENT_ID } from './config'
import './index.css'
import { SessionProvider } from './context/SessionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={`${CLIENT_ID}`}>
      <SessionProvider>
        <RouterProvider router={Routes} />
      </SessionProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
