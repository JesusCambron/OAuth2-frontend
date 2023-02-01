import React, { useContext } from 'react'
import "./google-button.css"
import { VITE_BACK_URL } from '../../config';
import { FcGoogle } from "react-icons/fc";
import SessionContext from '../../context/SessionContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const TYPES = {
  login: { text: "Login with Google", url: `${VITE_BACK_URL}/api/account/login/google` },
  signup: { text: "Signup", url: `${VITE_BACK_URL}/api/account/signup/google` },
}

const GoogleButton = ({ type }) => {
  const { handleSession } = useContext(SessionContext);

  const useGoogle = useGoogleLogin({
    onSuccess: codeResponse => {
      console.log(type.url)
      axios.post(type.url, {
        access_token: codeResponse.access_token
      }).then(response => handleSession(response))
        .catch(err => console.log(err))
    },
    onError: errorResponse => console.log(errorResponse)
  });

  return (
    <div className="btn button-container" onClick={useGoogle}>
      <FcGoogle size={30} />
      <p>{type.text}</p>
    </div>
  )
}

export default GoogleButton