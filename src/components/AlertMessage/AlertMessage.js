import React from "react";
import "./AlertMessage.css";
import PropTypes from "prop-types";

const AlertMessage = props => {
  return (
    <div
      className={
        props.type === "success"
          ? "success alert__msg__div"
          : "error alert__msg__div"
      }
    >
      <p>
        {props.body} &nbsp;
        <span
          style={{ cursor: "pointer" }}
          onClick={() => props.close({ show: false, type: "", body: "" })}
        >
          &nbsp; &#10005;
        </span>
      </p>
    </div>
  );
};

AlertMessage.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.string,
  body: PropTypes.string,
  close: PropTypes.func.isRequired
};

export default AlertMessage;
