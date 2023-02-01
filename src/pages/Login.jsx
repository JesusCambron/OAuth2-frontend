import React, { useContext, useState } from 'react'
import './login.css'
import GoogleButton, { TYPES } from '../components/GoogleButton/GoogleButton'
import Button from '../components/Button/Button'
import SessionContext from '../context/SessionContext';
import axios from 'axios';
import { VITE_BACK_URL } from '../config';

const initialCredentials = {
  email: "",
  pw: "",
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const { handleSession } = useContext(SessionContext);

  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.id]: e.target.value })
  }

  const onClick = async (e) => {
    e.preventDefault();
    await axios.post(`${VITE_BACK_URL}/api/account/login/`, credentials).then(response => response.json())
      .then(response => handleSession(response.data))
      .catch(err => console.log(err));
  }

  return (
    <section>
      <h1 className="title">Oauth Project</h1>
      <div className="login-container">
        <h2>Login</h2>
        <div className="form-container">
          <form action="POST">
            <div className="input-container">
              <input type="email" name="email" id="email" placeholder=" " className="form-input" value={credentials.email} onChange={e => onChange(e)} />
              <label htmlFor="email" className="form-label">Email</label>
            </div>
            <div className="input-container">
              <input type="password" name="pw" id="pw" className="form-input" placeholder=" " value={credentials.pw} onChange={e => onChange(e)} />
              <label htmlFor="pw" className="form-label">Password</label>
            </div>
            <div className="form-button-container">
              <Button text={"Login"} styleVersion={"primary"} onClick={onClick} />
            </div>
          </form>
        </div>
        <div className="or-container">
          <p className="or-login">OR</p>
        </div>
        <div className="oauth-login-container">
          <GoogleButton type={TYPES.login} />
        </div>
      </div>
    </section>
  )
}

export default Login