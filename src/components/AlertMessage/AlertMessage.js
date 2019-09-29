import React from "react";
import "./AlertMessage.css";

const AlertMessage = props => {
  return (
    <div className={props.type === "success" ? "success" : "error"}>
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

export default AlertMessage;
