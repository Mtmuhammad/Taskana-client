// Component to show error msg for CRUD operations
import React from 'react'

const ErrorMsg = ({ errMsg, setErrMsg }) => {
  return (
    <div
      data-testid="error-container"
      className="msg d-flex justify-content-between alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <p
        data-testid="error-msg"
        style={{ fontSize: "1.3rem", marginBottom: "0" }}
      >
        <strong>Error!</strong> {errMsg}
      </p>
      <i
        data-testid="error-msg-icon"
        type="button"
        className="close text-danger bx bx-x"
        data-dismiss="alert"
        aria-label="Close"
        style={{ fontSize: "2.3rem" }}
        onClick={() => setErrMsg("")}
      ></i>
    </div>
  );
};

export default ErrorMsg;
