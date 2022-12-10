// Modal to edit a new ticket

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { React, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const EditModal = ({
  users,
  ticket,
  projects,
  setAllTickets,
  setShowTickets,
  setAssignedTickets,
  setIncompleteTickets,
  setCompleteTickets,
  setIsLoading,
  setSuccess,
  setErrMsg,
}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [values, setValues] = useState({});

  // set input values in state
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle form submission to edit task
  const handleEdit = async (e) => {
    let isMounted = true;
    const controller = new AbortController();
    e.preventDefault();
    let formData = { ...values };
    if (formData.projectId ) formData.projectId = +formData.projectId
    if (formData.assignedTo) formData.assignedTo = +formData.assignedTo
    try {
      await axiosPrivate.patch(
        `/tickets/${ticket?.id}`,

        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const res = await axiosPrivate.get(`/tickets`, {
        signal: controller.signal,
      });

      let tickets = res.data.tickets.map(async (ticket) => {
        let result = await axiosPrivate.get(`/projects/${ticket.projectId}`, {
          signal: controller.signal,
        });
        let nameResult = await axiosPrivate.get(
          `/users/${ticket.assignedTo}`,
          {
            signal: controller.signal,
          }
        );
        ticket[
          "assignedName"
        ] = `${nameResult.data.user.firstName} ${nameResult.data.user.lastName}`;
        ticket["projectName"] = result.data.project.name;
        return ticket;
      });

      tickets = await Promise.all(tickets);

      isMounted && setAllTickets(tickets);
      setShowTickets()
        setShowTickets(tickets);
        setIsLoading(false)

        setAssignedTickets(
          tickets.filter(
            (ticket) => ticket.assignedTo === auth?.user?.empNumber
          ) || 0
        );
        setIncompleteTickets(
          tickets.filter((ticket) => ticket.status === "In Progress") || 0
        );
        setCompleteTickets(
          tickets.filter((ticket) => ticket.status === "Complete") || 0
        );


      setErrMsg("");
      setSuccess("Ticket Modified!");
      setValues()
    } catch (err) {
      setErrMsg(err?.response?.data?.error?.message);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  return (
    <div
      style={{ color: "black" }}
      className="modal fade"
      id={`editTicket${ticket?.id}`}
      tabIndex="-1"
      aria-hidden="true"
      data-testid="edit-modal"
    >
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              data-testid="header"
              className="modal-title  fw-bold"
              id="editTicketLabel"
            >
              {" "}
              Edit Ticket
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
                defaultValue={ticket?.title}
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
                placeholder="Add any extra details about this ticket"
                name="description"
                onChange={onChange}
                data-testid="input"
                defaultValue={ticket?.description}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="editTicketAssignedTo">Assigned Name</label>
              <select
                className="form-control"
                id="editTicketAssignedTo"
                name="assignedTo"
                style={{ fontSize: "1.3rem" }}
                onChange={onChange}
                data-testid="input"
                defaultValue={ticket?.assignedTo}
              >
                <option default value="">
                  Choose a team member:
                </option>
                {users &&
                  users.map((user) => (
                    <option key={user?.empNumber} value={user?.empNumber}>
                      {user?.firstName} {user?.lastName} ({user.empRole})
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="editTicketProjectId">Project Name</label>
              <select
                className="form-control"
                id="editTicketProjectId"
                name="projectId"
                style={{ fontSize: "1.3rem" }}
                onChange={onChange}
                data-testid="input"
                defaultValue={ticket?.projectId}
              >
                <option default value="">
                  Choose a project:
                </option>
                {projects &&
                  projects.map((project) => (
                    <option key={project?.id} value={project?.id}>{project?.name}</option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="editTicketStatus" className="form-label">
                Ticket Status
              </label>
              <select
                id="editTicketStatus"
                className="form-select"
                onChange={onChange}
                name="status"
                data-testid="input"
                defaultValue={ticket?.status}
              >
                <option defaultValue="">Choose a status:</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
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
              type="button"
              className="fs-5 btn btn-success"
              data-testid="edit-btn"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
