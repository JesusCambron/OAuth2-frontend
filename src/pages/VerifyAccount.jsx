import React, { useContext, useEffect, useState } from 'react'
import { VITE_BACK_URL } from '../config';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Card from '../components/Card/Card';
import SessionContext from '../context/SessionContext';
import axios from 'axios';

const initialMessage = "Verifying your account...";
const successVerifyMessage = "Your account is verify, please login";
const errorVerifyMessage = "Incorrect verify link";

const VerifyAccount = () => {
  const { isLoading, setIsLoading } = useContext(SessionContext);
  const [message, setMessage] = useState(initialMessage);
  let { id, token } = useParams();

  useEffect(() => {
    setIsLoading(false);
    verifyAccount(id, token);
  })

  const verifyAccount = async (id, token) => {
    await axios.get(`${VITE_BACK_URL}/api/account/verify/${id}/${token}`,)
      .then(response => {
        console.log(response);
        setIsLoading(false);
        setMessage(successVerifyMessage);
      })
      .catch(err => setMessage(errorVerifyMessage));
  }

  return (
    <section className="section verify-account">
      <Card>
        <h1 className={`${isLoading ? "blink" : ""}`}>{message}</h1>
        <div className="verify-account-login-link">
          {isLoading || <Link to={"/oauth/login"}><p>Login</p></Link>}
        </div>
      </Card>
    </section>
  )
}

export default VerifyAccount