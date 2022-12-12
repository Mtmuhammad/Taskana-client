// Modal to create a new project
import React from "react";

const CreateModal = ({ onChange, handleCreate }) => {
  return (
    <div
      className="modal fade"
      id="createUser"
      tabIndex="-1"
      aria-hidden="true"
      data-testid="create-modal"
    >
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              data-testid="header"
              className="modal-title  fw-bold"
              id="createUserLabel"
            >
              {" "}
              Create User
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              data-testid="close-btn"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="What is the user's first name?"
                onChange={onChange}
                data-testid="input"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="What is the user's last name?"
                onChange={onChange}
                data-testid="input"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                autoComplete="off"
                type="email"
                className="form-control"
                id="email"
                placeholder="Add user email"
                name="email"
                onChange={onChange}
                data-testid="input"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Add user password"
                name="password"
                onChange={onChange}
                data-testid="input"
                autoComplete="off"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="empRole" className="form-label">
                Employee Role
              </label>
              <select
                onChange={onChange}
                className="form-select"
                id="empRole"
                name="empRole"
              >
                <option value="" defaultValue>
                  Choose a role:
                </option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Web Designer">Web Designer</option>
                <option value="Mobile Developer">Mobile Developer</option>
                <option value="Software Engineer">Software Engineer</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="isAdmin" className="form-label">
                Is this employee admin?
              </label>
              <select
                onChange={onChange}
                className="form-select"
                id="isAdmin"
                name="isAdmin"
              >
                <option value="" defaultValue>
                  Choose a value:
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="fs-5 btn btn-secondary"
              data-bs-dismiss="modal"
              data-testid="cancel-btn"
            >
              Cancel
            </button>
            <button
              data-bs-dismiss="modal"
              onClick={handleCreate}
              type="button"
              className="fs-5 btn btn-success"
              data-testid="create-btn"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
