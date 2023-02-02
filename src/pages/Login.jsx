import React, { useContext, useState } from 'react'
import Button from '../components/Button/Button'
import SessionContext from '../context/SessionContext';
import GoogleButton, { TYPES } from '../components/GoogleButton/GoogleButton';
import { VITE_BACK_URL } from '../config';
import axios from 'axios';
import { decodeToken } from "react-jwt";
import { FiUser, FiLock } from "react-icons/fi";
import './login.css'

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
    await axios.post(`${VITE_BACK_URL}/api/account/login/`, credentials)
      .then(response => {
        const decodedToken = decodeToken(response.data.data);
        const session = {
          first_name: decodedToken.first_name,
          last_name: decodedToken.last_name,
          email: decodedToken.email,
          token: response.data.data,
        }
        handleSession(session);
      })
      .catch(err => console.log(err));
  }

  return (
    <section>
      <h1 className="title">Oauth Project</h1>
      <div className="oauth-container">
        <h2>Login</h2>
        <div className="form-container">
          <form action="POST">
            <div className="input-container">
              <FiUser size={20} className="icon-input" />
              <input type="email" name="email" id="email" placeholder=" " className="form-input" value={credentials.email} onChange={e => onChange(e)} />
              <label htmlFor="email" className="form-label">Email</label>
            </div>
            <div className="input-container">
              <FiLock size={20} className="icon-input" />
              <input type="password" name="pw" id="pw" className="form-input" placeholder=" " value={credentials.pw} onChange={e => onChange(e)} />
              <label htmlFor="pw" className="form-label">Password</label>
            </div>
            <div className="forgot-password-container">
              <a href="">Forgot your password?</a>
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
        <div className="signup-container">
          <a href="">Sign Up</a>
        </div>
      </div>
    </section>
  )
}

export default Login