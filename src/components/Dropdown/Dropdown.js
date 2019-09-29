import React from "react";
import "./Dropdown.css";

const Dropdown = props => {
  return (
    <div className="dropdown__container">
      <label htmlFor={props.name}>{props.name.toUpperCase()}</label>
      <select
        className="dropdown"
        name={props.name}
        id={props.name}
        onChange={e => props.change(props.id, e)}
      >
        <option value="">Select state</option>
        {props.optionsArr.map(({ id, label }) => (
          <option key={id} value={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
