// Modal to edit a new task

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { React, useState } from "react";
import "../taskItem/TaskItem.scss";
import useAuth from "../../../hooks/useAuth";

const EditModal = ({
  task,
  setShowTasks,
  setUserTasks,
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
    if (formData.important) formData.important = formData.important === "true";
    try {
      await axiosPrivate.patch(
        `/tasks/${task?.id}`,

        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const res = await axiosPrivate.get(`/tasks/${auth?.user?.empNumber}`, {
        signal: controller.signal,
      });

      setErrMsg("");
      setSuccess("Task Modified!");
      isMounted && setUserTasks(res.data.tasks);
      setShowTasks(res.data.tasks);
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
      id={`editTask${task?.id}`}
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
              id="editTaskLabel"
            >
              {" "}
              Edit Task
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
                defaultValue={task?.title}
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
                defaultValue={task?.description}
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
                defaultValue={task?.important}
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
              type="button"
              className="fs-5 btn btn-success"
              data-testid="edit-btn"
              onClick={handleEdit}
            >
              Edit Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
