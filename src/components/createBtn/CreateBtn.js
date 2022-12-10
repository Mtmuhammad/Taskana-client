// Btn to create task, projects, and tickets
import React from 'react'

const CreateBtn = ({ name }) => {
  return (
    <div
      data-testid="btn-container"
      className="mb-5 d-flex justify-content-end"
    >
      <button
        type="button"
        className="btn create-btn"
        data-bs-toggle="modal"
        data-bs-target={`#create${name}`}
      >
        <i data-testid="btn-icon" className="me-2 bx bxs-plus-circle"></i>Create{" "}
        {name}
      </button>
    </div>
  );
};

export default CreateBtn;
