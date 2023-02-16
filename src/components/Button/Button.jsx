import React from 'react';
import PropTypes from "prop-types";
import "./button.css"

const Button = (props) => {
  return (
    <button
      className={`btn btn-g btn-${props.styleVersion}`}
      type={props.type}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

Button.defaultProps = {
  text: "Button",
  styleVersion: "primary",
  type: "button",
  isDisabled: false,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  styleVersion: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button