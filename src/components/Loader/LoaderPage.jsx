import React from 'react'
import Loader from './Loader'
import "./loader-page.css";

const LoaderPage = () => {
  return (
    <div className="loader-page">{<Loader />}</div>
  )
}

export default LoaderPage