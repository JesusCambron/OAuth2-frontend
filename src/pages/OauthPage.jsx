import React from 'react'
import { Outlet } from 'react-router-dom'

const OauthPage = () => {
  return (
    <section className="section oauth-section">
      <Outlet />
    </section>
  )
}

export default OauthPage