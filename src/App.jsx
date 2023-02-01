import GoogleButton from "./components/GoogleButton/GoogleButton"
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

function App() {
  const login = useGoogleLogin({
    onSuccess: codeResponse => {
      console.log(codeResponse)
      axios.post('http://localhost:8520/api/account/login/google', {
        access_token: codeResponse.access_token
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onError: errorResponse => console.log(errorResponse)
  });

  const signup = useGoogleLogin({
    onSuccess: codeResponse => {
      console.log(codeResponse)
      axios.post('http://localhost:8520/api/account/signup/google', {
        access_token: codeResponse.access_token
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onError: errorResponse => console.log(errorResponse)
  });

  const verify = (e) => {
    e.preventDefault();
    axios.get('http://localhost:8520/api/account/verify/63/4e21bd4e5440ece4e52ef17dea11f3f22de8e36bc7e08570ac7df31963ddf755')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <div id="sigInDiv">
        <GoogleButton text={"Log In"} onClick={login} />
        <GoogleButton text={"Sign Up"} onClick={signup} />
        <button onClick={e => verify(e)}>VERIFY</button>
      </div>
    </div>
  )
}

export default App
