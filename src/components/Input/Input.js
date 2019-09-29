import React from "react";
import "./Input.css";
import PropTypes from "prop-types";

const Input = ({ change, ...props }) => {
  return (
    <div className="input__container">
      <label htmlFor={props.name}>{props.name.toUpperCase()}</label>
      <input
        id={props.name}
        type="text"
        {...props}
        onChange={e => change(props.id, e)}
      />
    </div>
  );
};

Input.proptype = {
  change: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.number
};
export default Input;
