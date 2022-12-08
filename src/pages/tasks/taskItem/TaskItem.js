// an individual task to be rendered in task table

import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import EditModal from "../editTask/EditModal";
import DeleteModal from "../deleteTask/DeleteModal";

const TaskItem = ({
  setShowTasks,
  task,
  setErrMsg,
  filterTasks,
  setUserTasks,
  setSuccess,
}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [checked, setChecked] = useState(
    task?.status === "Completed" ? true : false
  );

  // check  task. Set status to "completed".
  const handleCheck = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      await axiosPrivate.patch(
        `/tasks/${task?.id}`,

        JSON.stringify({ status: "Completed" }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const res = await axiosPrivate.get(`/tasks/${auth?.user?.empNumber}`, {
        signal: controller.signal,
      });
      isMounted && setUserTasks(res.data.tasks);
      setShowTasks(res.data.tasks);
      filterTasks(res);
      setChecked(!checked);
    } catch (err) {
      setErrMsg(err?.response?.data?.error?.message);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  // uncheck  task. Set status to "open"
  const handleUncheck = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      await axiosPrivate.patch(
        `/tasks/${task?.id}`,

        JSON.stringify({ status: "Open" }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const res = await axiosPrivate.get(`/tasks/${auth?.user?.empNumber}`, {
        signal: controller.signal,
      });
      isMounted && setUserTasks(res.data.tasks);
      setShowTasks(res.data.tasks);
      filterTasks(res);
      setChecked(!checked);
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
      data-testid="task-item"
      className="
       task-item
       p-3
       border-bottom
       position-relative
     "
    >
      <div className="d-flex align-items-start">
        <div className="w-100">
          <div
            className="
            
             d-flex
             align-items-start
             form-check
           "
          >
            {/* checkbox */}
            {checked ? (
              <input
                style={{ height: "1.5rem", width: "1.5rem" }}
                type="checkbox"
                className="form-check-input flex-shrink-0 me-3"
                id="checkbox1"
                onClick={handleUncheck}
                defaultChecked
              />
            ) : (
              <input
                style={{ height: "1.5rem", width: "1.5rem" }}
                type="checkbox"
                className="form-check-input flex-shrink-0 me-3"
                id="checkbox1"
                onClick={handleCheck}
                data-testid="task-checkbox"
              />
            )}
            <label className="form-check-label" htmlFor="checkbox1"></label>
            <div>
              <div>
                {/* task title */}
                <h5
                  data-testid="task-title"
                  className={checked ? "checked fs-4" : "fs-4"}
                >
                  {task?.title}{" "}
                  {task?.important && (
                    <i className="text-warning bx bxs-star"></i>
                  )}
                </h5>

                {/* task description */}
                <div
                  data-testid="task-description"
                  className={
                    checked ? "checked text-muted fs-3" : "text-muted fs-3"
                  }
                >
                  {task?.description}
                </div>

                {/* task date */}
                <span
                  data-testid="task-date"
                  className={
                    checked ? "checked fs-2 text-muted" : "fs-2 text-muted"
                  }
                >
                  <i className="bx bxs-calendar me-2"></i>
                  {task?.date}
                </span>
                {/* task btn group */}
                <div data-testid="task-btn-group" className="mt-3">
                  <button
                    type="button"
                    className="task-btn btn btn-warning text-light me-3"
                    data-bs-toggle="modal"
                    data-bs-target={`#editTask${task?.id}`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={`#deleteTask${task?.id}`}
                    className="task-btn btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* edit task modal */}
      <EditModal
        setUserTasks={setUserTasks}
        setShowTasks={setShowTasks}
        task={task}
        setErrMsg={setErrMsg}
        setSuccess={setSuccess}
      />
      {/* delete task modal */}
      <DeleteModal
        setUserTasks={setUserTasks}
        setShowTasks={setShowTasks}
        task={task}
        setErrMsg={setErrMsg}
        setSuccess={setSuccess}
        filterTasks={filterTasks}
      />
    </div>
  );
};

export default TaskItem;
