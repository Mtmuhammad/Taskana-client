// Component to show success msg for CRUD operations

const SuccessMsg = ({ success, setSuccess }) => {
  return (
    <div
      data-testid="success-container"
      className="msg d-flex justify-content-between alert alert-success alert-dismissible fade show"
      role="alert"
    >
      <p
        data-testid="success-msg"
        style={{ fontSize: "1.3rem", marginBottom: "0" }}
      >
        <strong>{success}</strong>
      </p>
      <i
        data-testid="success-msg-icon"
        type="button"
        className="close text-success bx bx-x"
        data-dismiss="alert"
        aria-label="Close"
        style={{ fontSize: "2.3rem" }}
        onClick={() => setSuccess("")}
      ></i>
    </div>
  );
};

export default SuccessMsg;
