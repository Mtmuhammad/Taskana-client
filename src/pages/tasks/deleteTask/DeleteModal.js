// Modal to delete a new task

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";

const DeleteModal = ({
  setShowTasks,
  filterTasks,
  setUserTasks,
  task,
  setSuccess,
  setErrMsg,
}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // handle form submission for project deletion
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let isMounted = true;
      const controller = new AbortController();
      const id = task.id;
      await axiosPrivate.delete(`/tasks/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const res = await axiosPrivate.get(`/tasks/${auth?.user?.empNumber}`, {
        signal: controller.signal,
      });
      isMounted && setUserTasks(res.data.tasks);
      setShowTasks(res.data.tasks);
      filterTasks(res);
      setSuccess("Task Deleted!");
    } catch (err) {
      setErrMsg(err?.response?.data?.error?.message);
    }
  };

  return (
    <div
      className="modal fade"
      id={`deleteTask${task?.id}`}
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
