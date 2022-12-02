// Component that displays project information on project page

import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./ProjectCard.scss";
import DeleteModal from "../deleteProject/DeleteModal";
import EditModal from "../editProject/EditModal";

const ProjectCard = ({
  setProjects,
  projects,
  project,
  setSuccess,
  setErrMsg,
}) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  const [tickets, setTickets] = useState();
  const [info, setInfo] = useState();
  const [closedTickets, setClosedTickets] = useState();
  const [progress, setProgress] = useState(0);

  // get all Tickets
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTickets = async () => {
      try {
        const res = await axiosPrivate.get(`/tickets`, {
          signal: controller.signal,
        });
        const result = await axiosPrivate.get(`/projects/${project.id}`, {
          signal: controller.signal,
        });

        setInfo(result.data.project);
        const tickets = res.data.tickets.filter(
          (ticket) => ticket.projectId === project.id
        );
        const closed = res.data.tickets.filter(
          (ticket) => ticket.status === "Completed"
        );
        isMounted && setTickets(tickets);
        setClosedTickets(closed);

        tickets?.length !== 0 &&
          setProgress(
            Math.round((closedTickets?.length / tickets?.length) * 100) ||
              Number(0)
          );
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getTickets();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [closedTickets?.length, project?.id, axiosPrivate, location, navigate]);

  return (
    <div className="col-lg-4 col-md-6">
      <div data-testid="project-card" className="mb-5 project-card card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="project-name">
              <h4 data-testid="project-header" className="h3 mb-0 fw-bold mb-2">
                {project?.name}
              </h4>
            </div>
            {auth?.user?.isAdmin && (
              <div
                className="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-toggle="modal"
                  data-bs-target={`#editProject${project?.id}`}
                >
                  <i className="bx bxs-edit"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteProject${project?.id}`}
                >
                  <i className="bx bx-trash"></i>
                </button>
              </div>
            )}
          </div>

          <div className="row g-2 pt-4">
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i
                  style={{ background: "#15cfff90" }}
                  className="rounded-circle p-2 bx bx-paperclip"
                  data-testid="project-card-icon"
                ></i>
                <span data-testid="project-date" className="ms-2">
                  Created: {project?.date}{" "}
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i
                  style={{ background: "#00d09c90" }}
                  className="rounded-circle p-2 bx bxs-hourglass-top"
                  data-testid="project-card-icon"
                ></i>
                <span data-testid="project-deadline" className="ms-2">
                  Deadline: {project?.deadline}{" "}
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i
                  style={{ background: "#ffc36d90" }}
                  className="rounded-circle p-2 bx bxs-report"
                  data-testid="project-card-icon"
                ></i>
                <span data-testid="project-status" className="ms-2">
                  Status: {project?.status}
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i
                  style={{ background: "#ff505090" }}
                  className="rounded-circle p-2 bx bx-note"
                  data-testid="project-card-icon"
                ></i>
                <span className="ms-2" data-testid="project-tickets">
                  {tickets && tickets.length} tickets
                </span>
              </div>
            </div>
          </div>
          <div className="dividers-block"></div>
          <div data-testid="project-description" className="mt-4 h5">{info?.description}</div>
          <div className="d-flex align-items-center justify-content-center mt-3 mb-2">
            <h5 className="fw-bold mb-0">Progress</h5>
          </div>
          <div
            style={{ height: "2rem" }}
            data-testid="project-progress"
            className="progress mt-3"
          >
            {progress >= 0 && (
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{
                  padding: "1rem 0",
                  fontSize: "1.2rem",
                  width: `${progress}%`,
                }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress}%
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteModal
        setProjects={setProjects}
        projects={projects}
        setErrMsg={setErrMsg}
        setSuccess={setSuccess}
        project={project}
      />
      <EditModal
        setProjects={setProjects}
        projects={projects}
        setErrMsg={setErrMsg}
        setSuccess={setSuccess}
        project={project}
      />
    </div>
  );
};

export default ProjectCard;
