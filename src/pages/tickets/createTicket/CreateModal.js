// Modal to create a new ticket
import React from "react";

const CreateModal = ({ projects, users, onChange, handleCreate }) => {
  return (
    <div
      className="modal fade"
      id="createTicket"
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
              id="createTicketLabel"
            >
              {" "}
              Create Ticket
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
              <label htmlFor="title" className="form-label">
                Ticket Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="What is the title of this ticket?"
                onChange={onChange}
                data-testid="input"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="createTicketDescription" className="form-label">
                Description (optional)
              </label>
              <textarea
                className="form-control"
                id="createTicketDescription"
                rows="3"
                placeholder="Add any extra details about the ticket"
                name="description"
                onChange={onChange}
                data-testid="input"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="createTicketAssignedTo">Assigned Name</label>
              <select
                className="form-control"
                id="createTicketAssignedTo"
                name="assignedTo"
                style={{ fontSize: "1.3rem" }}
                onChange={onChange}
                data-testid="input"
              >
                <option default value="">
                  Choose a team member:
                </option>
                {users &&
                  users.map((user) => (
                    <option value={user?.empNumber}>
                      {user?.firstName} {user?.lastName} ({user.empRole})
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="createTicketProjectId">Project Name</label>
              <select
                className="form-control"
                id="createTicketProjectId"
                name="projectId"
                style={{ fontSize: "1.3rem" }}
                onChange={onChange}
                data-testid="input"
              >
                <option default value="">
                  Choose a project:
                </option>
                {projects &&
                  projects.map((project) => (
                    <option value={project?.id}>{project?.name}</option>
                  ))}
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
