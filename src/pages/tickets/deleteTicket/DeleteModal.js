// Modal to delete a new ticket

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import React from 'react'

const DeleteModal = ({
  setShowTickets,
  setAssignedTickets,
  setIncompleteTickets,
  setOpenTickets,
  setAllTickets,
  setIsLoading,
  ticket,
  setSuccess,
  setErrMsg,
}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // handle form submission for ticket deletion
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let isMounted = true;
      const controller = new AbortController();
      const id = ticket.id;
      await axiosPrivate.delete(`/tickets/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const res = await axiosPrivate.get(`/tickets`, {
        signal: controller.signal,
      });

      let tickets = res.data.tickets

      isMounted && setAllTickets(tickets);
      setShowTickets();
      setShowTickets(tickets);
      setIsLoading(false);

      setAssignedTickets(
        tickets.filter(
          (ticket) => ticket.assignedTo === auth?.user?.empNumber
        ) || 0
      );
      setIncompleteTickets(
        tickets.filter((ticket) => ticket.status === "In Progress") || 0
      );
      setOpenTickets(
        tickets.filter((ticket) => ticket.status === "Open") || 0
      );

      setErrMsg("");
      setSuccess("Ticket Deleted!");
    } catch (err) {
      setErrMsg(err?.response?.data?.error?.message);
    }
  };

  return (
    <div
      className="modal fade"
      id={`deleteTicket${ticket?.id}`}
      tabIndex="-1"
      aria-hidden="true"
      style={{ display: "none", color: "black" }}
      data-testid="delete-modal"
    >
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              data-testid="header"
              className="modal-title  fw-bold"
              id="deleteProjectLabel"
            >
              {" "}
              Delete item Permanently?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              data-testid="close-btn"
            ></button>
          </div>
          <div className="modal-body justify-content-center flex-column d-flex">
            <i
              data-testid="delete-icon"
              className="bx bxs-trash text-danger display-2 text-center mt-2"
            ></i>
            <p data-testid="delete-text" className="mt-4 fs-3 text-center">
              You can only delete this item Permanently
            </p>
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
              onClick={handleDelete}
              type="button"
              className="fs-5 btn btn-danger color-fff"
              data-bs-dismiss="modal"
              data-testid="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
