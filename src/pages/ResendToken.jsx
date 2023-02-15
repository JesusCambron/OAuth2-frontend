import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button'
import Card from '../components/Card/Card'
import { VITE_BACK_URL } from '../config';
import { isEmail, isEmptyString } from '../utils/Validators';

const initialState = "";
const WAIT_TIME = 600;
const initialErrorsForm = {
}
const initialStatusMessage = null;

const ResendToken = () => {
  const [email, setEmail] = useState(initialState);
  const [statusMessage, setStatusMessage] = useState(initialStatusMessage);
  const [errorsForm, setErrorsForm] = useState(initialErrorsForm);

  useEffect(() => {
    const filterTimeOut = setTimeout(() => {
      let errors = [];
      if (Object.entries(errorsForm).length) {
        errors = validateEmail(email);
      }
      setErrorsForm({ ...errorsForm, email: errors });
    }, WAIT_TIME);

    return () => {
      clearTimeout(filterTimeOut);
    };
  }, [email])

  const onChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setEmail(inputValue);
  }

  const onClick = async (e) => {
    e.preventDefault();
    await axios.post(`${VITE_BACK_URL}/api/account/resend-token`, {
      email: email
    }).then(response => {
      console.log(response)
      setStatusMessage(true)
    })
      .catch(error => setStatusMessage(false))
  }

  const validateEmail = (value) => {
    const errors = []

    if (isEmptyString(value)) errors.push("This field can't be empty");

    if (!isEmail(value)) errors.push("Incorrect email pattern");

    return errors;
  }

  return (
    <section className="section resend-token">
      <Card>
        {statusMessage === null ?
          <>
            <h1>Resend Token</h1>
            <div className="text-justify">
              <p>Type your email and send it to us to resend your token</p>
            </div>
            <div className="form-container">
              <form action="POST">
                <div className="input-container">
                  <FiMail size={20} className="icon-input" />
                  <input type="email" name="email" id="email" placeholder=" " className="form-input" value={email} onChange={e => onChange(e)} />
                  <label htmlFor="email" className="form-label">Email</label>
                  {errorsForm?.email && errorsForm?.email.map(error => <small className="error-msg">{error}</small>)}
                </div>
                <div className="form-button-container">
                  <Button text={"Resend token"} styleVersion={"primary"} onClick={e => onClick(e)} />
                </div>
              </form>
            </div>
            <div className="mt-5r">
              <Link to={"/oauth/login"}>Login</Link>
            </div>
          </> :
          <>
            <h1>{statusMessage ? "Please check your token in your email" : "Sorry this email does not have an existing token in our system"}</h1>
            <div className="mt-5r">
              {<Link to={`/oauth/${statusMessage ? "login" : "signup"}`}><p>{statusMessage ? "Login" : "Signup"}</p></Link>}
            </div>
          </>
        }
      </Card>
    </section>
  )
}

export default ResendToken