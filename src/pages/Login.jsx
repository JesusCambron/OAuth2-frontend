import React, { useContext, useEffect, useState } from 'react'
import Button from '../components/Button/Button'
import SessionContext from '../context/SessionContext';
import GoogleButton, { GOOGLE_TYPES } from '../components/GoogleButton/GoogleButton';
import Card from '../components/Card/Card';
import { VITE_BACK_URL } from '../config';
import { FiLock, FiMail } from "react-icons/fi";
import axios from 'axios';
import { decodeToken } from "react-jwt";
import { Link, useNavigate } from 'react-router-dom';
import LoaderPage from '../components/Loader/LoaderPage';

const initialCredentials = {
  email: "",
  pw: "",
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [error, setError] = useState("");
  const { session, sessionLogin, isLoading, setIsLoading } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/home")
    }
  }, [session])

  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.id]: e.target.value })
  }

  const onClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post(`${VITE_BACK_URL}/api/account/login/`, credentials)
      .then(response => {
        const decodedToken = decodeToken(response.data.data);
        const session = {
          first_name: decodedToken.first_name,
          last_name: decodedToken.last_name,
          email: decodedToken.email,
          token: response.data.data,
        }
        sessionLogin(session);
      })
      .catch(err => {
        let message;
        if (err.response.status === 500) {
          message = "Internal server error";
        } else {
          message = err.response.data.message;
        }
        setError(message);
      });
    setIsLoading(false);
  }

  return (
    <>
      <h1 className="title">Oauth Project</h1>
      <Card>
        <h2>Login</h2>
        {error !== "" && <div className="error-container">{error}</div>}
        <div className="form-container">
          <form action="POST">
            <div className="input-container">
              <FiMail size={20} className="icon-input" />
              <input type="email" name="email" id="email" placeholder=" " className="form-input" value={credentials.email} onChange={e => onChange(e)} />
              <label htmlFor="email" className="form-label">Email</label>
            </div>
            <div className="input-container">
              <FiLock size={20} className="icon-input" />
              <input type="password" name="pw" id="pw" className="form-input" placeholder=" " value={credentials.pw} onChange={e => onChange(e)} />
              <label htmlFor="pw" className="form-label">Password</label>
            </div>
            <div className="dis-block text-align-end">
              <a href="">Did you forget your password?</a>
            </div>
            <div className="dis-block text-align-end mt-1r">
              <Link to={"/resend-token"}>Resend me my token</Link>
            </div>
            <div className="form-button-container">
              <Button text={"Login"} styleVersion={"primary"} onClick={e => onClick(e)} />
            </div>
          </form>
        </div>
        <div className="or-container">
          <p className="or-login">OR</p>
        </div>
        <div className="oauth-login-container">
          <GoogleButton type={GOOGLE_TYPES.login} onError={setError} />
        </div>
        <div className="signup-container">
          <Link to={"/oauth/signup"}>Sign Up</Link>
        </div>
      </Card>
      {isLoading && <LoaderPage />}
    </>
  )
}

export default Login