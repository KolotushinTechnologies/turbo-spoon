import React, { Fragment } from "react";
import ErrorMessage from "./ErrorMessage";

const ErrorInput = React.forwardRef((props, ref) => {
  var error = props.error;
  return (
    <div>
      <input {...props} ref={ref} error={null} />
      <ErrorMessage error={error} style={props.errorStyle || {}} />
    </div>
  );
});

export default ErrorInput;
