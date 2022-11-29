import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Sidebar from "../../components/sidebar/Sidebar";
import ProjectCard from "./projectCard/ProjectCard";
import useAuth from "../../hooks/useAuth";

const Projects = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [projects, setProjects] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  

  // get all projects
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProjects = async () => {
      try {
        const res = await axiosPrivate.get("/projects", {
          signal: controller.signal,
        });
        isMounted && setProjects(res.data.projects);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getProjects();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  

  return (
    <>
      <Sidebar />
      <section className="pages">
        <Breadcrumb page="Projects" />
        <div className="container">
          {auth.user.isAdmin && (
            <div className="mb-5 d-flex justify-content-end">
              <button
                type="button"
                className="btn create-btn"
                data-bs-toggle="modal"
                data-bs-target="#createProject"
              >
                <i className="me-2 bx bxs-plus-circle"></i>Create Project
              </button>
            </div>
          )}
          {/* error message */}
          {errMsg && (
            <div
              className="msg d-flex justify-content-between alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <p style={{ fontSize: "1.3rem", marginBottom: "0" }}>
                <strong>Error!</strong> {errMsg}
              </p>
              <i
                type="button"
                className="close text-danger bx bx-x"
                data-dismiss="alert"
                aria-label="Close"
                style={{ fontSize: "2.3rem" }}
                onClick={() => setErrMsg("")}
              ></i>
            </div>
          )}

          {/* success message */}
          {success && (
            <div
              className="msg d-flex justify-content-between alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <p style={{ fontSize: "1.3rem", marginBottom: "0" }}>
                <strong>{success}</strong>
              </p>
              <i
                type="button"
                className="close text-success bx bx-x"
                data-dismiss="alert"
                aria-label="Close"
                style={{ fontSize: "2.3rem" }}
                onClick={() => setSuccess("")}
              ></i>
            </div>
          )}

          <div className="row">
            {projects
              ? projects.map((project) => (
                  <ProjectCard
                    setProjects={setProjects}
                    projects={projects}
                    setErrMsg={setErrMsg}
                    setSuccess={setSuccess}
                    key={project.id}
                    project={project}
                  />
                ))
              : ""}
          </div>
        </div>

        {/* create project modal */}
        {/* <CreateModal onChange={onChange} handleCreate={handleCreate} /> */}
        {/* end create project modal */}
      </section>
    </>
  );
};

export default Projects;