// Modal to create a new project
import React from 'react'

const CreateModal = ({ onChange, handleCreate }) => {
  return (
    <div
      className="modal fade"
      id="createProject"
      tabIndex="-1"
      aria-hidden="true"
      data-testid="create-modal"
    >
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 data-testid="header" className="modal-title  fw-bold" id="createProjectLabel">
              {" "}
              Create Project
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
              <label htmlFor="name" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="What is the name of this project?"
                onChange={onChange}
                data-testid="input"
              />
            </div>
            <div className="deadline-form">
              <form>
                <div className="row g-3 mb-3">
                  <div className="col">
                    <label htmlFor="deadline" className="form-label">
                      Project End Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="deadline"
                      name="deadline"
                      onChange={onChange}
                      data-testid="input"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="mb-3">
              <label htmlFor="createDescription" className="form-label">
                Description (optional)
              </label>
              <textarea
                className="form-control"
                id="createDescription"
                rows="3"
                placeholder="Add any extra details about the project"
                name="description"
                onChange={onChange}
                data-testid="input"
              ></textarea>
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
