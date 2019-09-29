import React from "react";
import "./Input.css";

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
      <small style={{ display: "none" }}>Helper text here</small>
    </div>
  );
};

export default Input;
