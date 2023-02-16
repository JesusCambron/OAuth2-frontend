import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card/Card'

const CheckYourEmail = () => {
  return (
    <section className="section check-your-email">
      <Card>
        <h1>Check your email</h1>
        <p>We send you a link to activate your account</p>
        <div className="mt-1r">
          {<Link to={`/oauth/login`}><p>Login</p></Link>}
        </div>
      </Card>
    </section>
  )
}

export default CheckYourEmail