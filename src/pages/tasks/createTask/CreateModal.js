// Modal to create a new task
import React from 'react'

const CreateModal = ({ onChange, handleCreate }) => {
  return (
    <div
      className="modal fade"
      id="createTask"
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
              id="createTaskLabel"
            >
              {" "}
              Create Task
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
                Task Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="What is the title of this task?"
                onChange={onChange}
                data-testid="input"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="createTaskDescription" className="form-label">
                Description (optional)
              </label>
              <textarea
                className="form-control"
                id="createTaskDescription"
                rows="3"
                placeholder="Add any extra details about this task"
                name="description"
                onChange={onChange}
                data-testid="input"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="createTaskImportant">Is this task urgent?</label>
              <select
                className="form-control"
                id="createTaskImportant"
                name="important"
                style={{ fontSize: "1.3rem" }}
                onChange={onChange}
                data-testid="input"
              >
                <option default value="">
                  Choose an option:
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
