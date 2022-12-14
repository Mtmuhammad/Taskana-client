// Modal to edit a new project

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../projectCard/ProjectCard.scss";
import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditModal = ({
  info,
  setInfo,
  setProjects,
  project,
  setSuccess,
  setErrMsg,
}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  const [values, setValues] = useState({});
  const [currProject, setCurrProject] = useState(info);

  // get single project info
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProject = async () => {
      try {
        const res = await axiosPrivate.get(`/projects/${project?.id}`, {
          signal: controller.signal,
        });

        isMounted && setCurrProject(res.data.project);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getProject();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [project?.id, axiosPrivate, location, navigate]);

  // set input values in state
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle form submission to edit project
  const handleEdit = async (e) => {
    let isMounted = true;
    const controller = new AbortController();
    e.preventDefault();
    let formData = { ...values };

    try {
      await axiosPrivate.patch(
        `/projects/${info?.id}`,

        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const result = await axiosPrivate.get(`/projects`, {
        signal: controller.signal,
      });

      const projectRes = await axiosPrivate.get(`/projects/${info?.id}`, {
        signal: controller.signal,
      });

      setErrMsg("");
      setSuccess("Project Modified!");
      setProjects();
      isMounted && setProjects(result.data.projects);
      setInfo();
      setInfo(projectRes.data.project);
      setValues({});
    } catch (err) {
      setErrMsg(err?.response?.data?.error?.message);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  // format date for input default value
  const formatDate = (project) => {
    const [month, day, year] = project?.deadline?.split("-");

    return [year, month, day].join("-");
  };

  return (
    <div
      className="modal fade"
      id={`editProject${project?.id}`}
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
              id="editProjectLabel"
            >
              {" "}
              Edit Project
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
                defaultValue={project?.name}
                onChange={onChange}
                data-testid="input"
              />
            </div>
            <div className="deadline-form">
              <form>
                <div className="row g-3 mb-3">
                  <div className="col">
                    <label htmlFor="deadline" className="form-label">
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="deadline"
                      defaultValue={formatDate(project)}
                      name="deadline"
                      onChange={onChange}
                      data-testid="input"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-sm">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  aria-label="Default select Priority"
                  onChange={onChange}
                  name="status"
                  data-testid="input"
                >
                  <option defaultValue={project?.status}>
                    {project?.status}
                  </option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description (optional)
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="5"
                defaultValue={info && info?.description}
                onChange={onChange}
                name="description"
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
              onClick={handleEdit}
              type="button"
              className="fs-5 btn btn-success"
              data-bs-dismiss="modal"
              data-testid="edit-btn"
            >
              Change Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
