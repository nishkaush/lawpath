import React from "react";
import "./Dropdown.css";
import PropTypes from "prop-types";

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
        <option value="">Choose State (required)</option>
        {props.optionsArr.map(({ id, label }) => (
          <option key={id} value={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  optionsArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  change: PropTypes.func.isRequired
};

export default Dropdown;
