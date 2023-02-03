import React, { useEffect, useRef, useState } from 'react'
import { FiLock, FiMail, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Button from '../components/Button/Button'
import Card from '../components/Card/Card'
import GoogleButton, { GOOGLE_TYPES } from '../components/GoogleButton/GoogleButton'
import { isCorrectLength, isEmail, isEmptyString, isValidateName, isValidatePassword } from '../utils/Validators'

const initialAccount = {
}

const initialErrorsForm = {
  first_name: [],
  last_name: [],
  email: [],
  pw: [],
  pwConfirm: [],
}

const WAIT_TIME = 600;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 45;

const Signup = () => {
  const [account, setAccount] = useState(initialAccount);
  const [errorsForm, setErrorsForm] = useState(initialErrorsForm);
  const [lastChange, setLastChange] = useState({});
  const [isTextPassword, setIsTextPassword] = useState(false);
  const [isTextPasswordConfirm, setIsTextPasswordConfirm] = useState(false);

  useEffect(() => {
    if (Object.entries(account).length) {
      const filterTimeOut = setTimeout(() => {
        validateForm(lastChange);
      }, WAIT_TIME);

      return () => {
        clearTimeout(filterTimeOut);
      };
    }
  }, [account])


  const onChange = (e) => {
    e.preventDefault();
    setAccount({ ...account, [e.target.id]: e.target.value });
    setLastChange({ [e.target.id]: e.target.value })
  }

  const onClick = async (e) => {
    e.preventDefault();
    validateForm(account);
    /* await axios.post(`${VITE_BACK_URL}/api/account/signup/`, account)
      .then(response => {

      })
      .catch(err => console.log(err)); */
  }

  const validateForm = (fields) => {
    let validation;
    Object.entries(fields).forEach(element => {
      switch (element[0]) {
        case "first_name":
        case "last_name":
          validation = validateName(element[1]);
          setErrorsForm({ ...errorsForm, [element[0]]: validation });
          break;
        case "email":
          validation = validateEmail(element[1]);
          setErrorsForm({ ...errorsForm, [element[0]]: validation });
          break;
        case "pw":
          validation = validatePw(element[1]);
          setErrorsForm({ ...errorsForm, [element[0]]: validation });
          break;
        case "pwConfirm":
          validation = validatePwConfirm(element[1]);
          setErrorsForm({ ...errorsForm, [element[0]]: validation });
          break;
        default:
          break;
      }
    });


    if (!Object.entries(fields).length) {
      setErrorsForm({
        first_name: ["This field can't be empty"],
        last_name: ["This field can't be empty"],
        email: ["This field can't be empty"],
        pw: ["This field can't be empty"],
        pwConfirm: ["This field can't be empty"],
      })
    }
  }

  const validateName = (value) => {
    const errors = []

    if (isEmptyString(value)) errors.push("This field can't be empty");

    if (!isCorrectLength(value, MAX_NAME_LENGTH, MIN_NAME_LENGTH)) errors.push("This field must have at least two characters and less than forty-five characters");

    if (!isValidateName(value)) errors.push(`This field just accept character from "a" to "z" and a space between words`);

    return errors;
  }

  const validateEmail = (value) => {
    const errors = []

    if (isEmptyString(value)) errors.push("This field can't be empty");

    if (!isEmail(value)) errors.push("Incorrect email pattern");

    return errors;
  }

  const validatePw = (value) => {
    const errors = [];

    if (isEmptyString(value)) errors.push("This field can't be empty");

    if (!isValidatePassword(value)) errors.push("Password must have seven to fiveteen characters which contain at least one digit, one lower case and one upper case");
    return errors;
  }

  const validatePwConfirm = (value) => {
    const errors = [];
    if (value !== account.pw) errors.push("Password isn't equal");
    return errors;
  }

  return (
    <>
      <h1 className="title">Oauth Project</h1>
      <Card>
        <h2>Sign Up</h2>
        <div className="form-container">
          <form action="POST">
            <div className="input-container">
              <FiUser size={20} className="icon-input" />
              <input type="first_name" name="first_name" id="first_name" placeholder=" " className={`form-input${errorsForm.first_name.length ? " input-error" : ""}`} required value={account.first_name || ""} onChange={e => onChange(e)} />
              <label htmlFor="first_name" className="form-label">First Name</label>
              {errorsForm?.first_name && errorsForm?.first_name.map(error => <small className="error-msg">{error}</small>)}
            </div>
            <div className="input-container">
              <FiUser size={20} className="icon-input" />
              <input type="last_name" name="last_name" id="last_name" placeholder=" " className={`form-input${errorsForm.last_name.length ? " input-error" : ""}`} value={account.last_name || ""} onChange={e => onChange(e)} />
              <label htmlFor="last_name" className="form-label">Last Name</label>
              {errorsForm?.last_name && errorsForm?.last_name.map(error => <small className="error-msg">{error}</small>)}
            </div>
            <div className="input-container">
              <FiMail size={20} className="icon-input" />
              <input type="email" name="email" id="email" placeholder=" " className={`form-input${errorsForm.email.length ? " input-error" : ""}`} value={account.email || ""} onChange={e => onChange(e)} />
              <label htmlFor="email" className="form-label">Email</label>
              {errorsForm?.email && errorsForm?.email.map(error => <small className="error-msg">{error}</small>)}
            </div>
            <div className="input-container">
              <FiLock size={20} className="icon-input" />
              <input type={`${isTextPassword ? "password" : "text"}`} name="pw" id="pw" className={`form-input${errorsForm.pw.length ? " input-error" : ""}`} placeholder=" " value={account.pw || ""} onChange={e => onChange(e)} />
              <label htmlFor="pw" className="form-label">Password</label>
              {isTextPassword ?
                <FiEye size={20} className="pw-eye" onClick={e => setIsTextPassword(!isTextPassword)} /> :
                <FiEyeOff size={20} className="pw-eye" onClick={e => setIsTextPassword(!isTextPassword)} />
              }
              {errorsForm?.pw && errorsForm?.pw.map(error => <small className="error-msg">{error}</small>)}
            </div>
            <div className="input-container">
              <FiLock size={20} className="icon-input" />
              <input type={`${isTextPasswordConfirm ? "password" : "text"}`} name="pwConfirm" id="pwConfirm" className={`form-input${errorsForm.pwConfirm.length ? " input-error" : ""}`} placeholder=" " value={account.pwConfirm || ""} onChange={e => onChange(e)} />
              <label htmlFor="pwConfirm" className="form-label">Password Confirm</label>
              {isTextPasswordConfirm ?
                <FiEye size={20} className="pw-eye" onClick={e => setIsTextPasswordConfirm(!isTextPasswordConfirm)} /> :
                <FiEyeOff size={20} className="pw-eye" onClick={e => setIsTextPasswordConfirm(!isTextPasswordConfirm)} />
              }
              {errorsForm?.pwConfirm && errorsForm?.pwConfirm.map(error => <small className="error-msg">{error}</small>)}
            </div>
            <div className="form-button-container">
              <Button text={"Sign Up"} styleVersion={"primary"} onClick={e => onClick(e)} />
            </div>
          </form>
        </div>
        <div className="or-container">
          <p className="or-login">OR</p>
        </div>
        <div className="oauth-login-container">
          <GoogleButton type={GOOGLE_TYPES.signup} />
        </div>
        <div className="signup-container">
          <Link to={"/oauth/login"}>Sign In</Link>
        </div>
      </Card>
    </>
  )
}

export default Signup