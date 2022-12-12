// Modal to delete a user

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../../projects/projectCard/ProjectCard.scss";
import React from "react";

const DeleteModal = ({ users, user, setUsers, setSuccess, setErrMsg }) => {
  const axiosPrivate = useAxiosPrivate();

  // handle form submission for user deletion
  const handleDelete = async (e) => {
    e.preventDefault();
    const id = user?.empNumber;
    try {
      await axiosPrivate.delete(`/users/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setUsers(users.filter((u) => u.empNumber !== id));
      setSuccess("User Deleted!");
    } catch (err) {
      setErrMsg(err?.response?.data?.error?.message);
    }
  };

  return (
    <div
      className="modal fade"
      id={`deleteUser${user?.empNumber}`}
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
              id="deleteUserLabel"
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
