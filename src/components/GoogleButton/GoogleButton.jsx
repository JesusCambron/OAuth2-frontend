import React, { useContext } from 'react'
import { VITE_BACK_URL } from '../../config';
import { FcGoogle } from "react-icons/fc";
import SessionContext from '../../context/SessionContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

const LOGIN = "login";
const SIGNUP = "signup";

export const GOOGLE_TYPES = {
  login: { type: LOGIN, text: "Login with Google", url: `${VITE_BACK_URL}/api/account/login/google` },
  signup: { type: SIGNUP, text: "Signup with Google", url: `${VITE_BACK_URL}/api/account/signup/google` },
}

const GoogleButton = ({ type, onError }) => {
  const { sessionLogin, setIsLoading } = useContext(SessionContext);
  const navigate = useNavigate();

  const useGoogle = useGoogleLogin({
    onSuccess: async codeResponse => {
      await axios.post(type.url, {
        access_token: codeResponse.access_token
      }).then(response => {
        if (type.type === LOGIN) {
          const token = response.data.data;
          const decodedToken = decodeToken(token);
          const session = {
            first_name: decodedToken.first_name,
            last_name: decodedToken.last_name,
            email: decodedToken.email,
            token
          }
          sessionLogin(session);
        } else {
          navigate("/check-your-email");
        }
      })
        .catch(err => {
          let message;
          if (err.response.status === 500) {
            message = "Internal server error";
          } else {
            message = err.response.data.message;
          }
          onError(message);
        })
      setIsLoading(false);
    },
    onError: errorResponse => console.log(errorResponse)
  });

  const onClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    useGoogle();
  }


  return (
    <div className="btn button-container" onClick={e => onClick(e)}>
      <FcGoogle size={30} />
      <p>{type.text}</p>
    </div>
  )
}

export default GoogleButton