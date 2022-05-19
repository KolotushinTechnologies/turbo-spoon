import React from "react";

const ErrorMessage = ({ error, message, style = {}, className = "" }) => {
  return error ? (
    <div
      className={"errorMessage " + className}
      style={{
        left: error.ref?.offsetLeft + "px",
        width: error.ref?.offsetWidth + "px",
        ...style
      }}
    >
      {message ||
        error.message ||
        (error.type == "pattern" && "Wrong pattern") ||
        "Wrong"}
    </div>
  ) : null;
};

export default ErrorMessage;
