import React from 'react'
import { Outlet } from 'react-router-dom'

const OauthPage = () => {
  return (
    <section className="oauth-section">
      <Outlet />
    </section>
  )
}

export default OauthPage