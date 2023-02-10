import React, { useContext, useEffect } from 'react';
import SessionContext from '../context/SessionContext';
import Button from "../components/Button/Button";
import { HiLogout } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import LoaderPage from '../components/Loader/LoaderPage';

const Home = () => {
  const { session, sessionLogout, isLoading, setIsLoading } = useContext(SessionContext);
  const { first_name, last_name, email } = session;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false)
  })


  const logout = (e) => {
    e.preventDefault();
    sessionLogout();
    navigate("/oauth/login");
  }

  return (
    <section className="section home">
      <div className="title-home-container">
        <h1>Home</h1>
      </div>
      <div className="home-user-info">
        <p>{first_name}</p>
        <p>{last_name}</p>
        <p>{email}</p>
      </div>
      <div className="btn button-container logout-container" onClick={e => logout(e)}>
        <Button text={"Logout"} styleVersion={"custom"} />
        <HiLogout size={22} />
      </div>
      {isLoading && <LoaderPage />}
    </section>
  )
}

export default Home