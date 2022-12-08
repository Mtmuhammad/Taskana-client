// Project page component

import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Sidebar from "../../components/sidebar/Sidebar";
import ProjectCard from "./projectCard/ProjectCard";
import useAuth from "../../hooks/useAuth";
import CreateModal from "./createProject/CreateModal";
import SuccessMsg from "../../components/successMsg/SuccessMsg";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import CreateBtn from "../../components/createBtn/CreateBtn";

const Projects = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [projects, setProjects] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    deadline: "",
    status: "",
  });

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

  // set input values in state
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // clear input on success
  const clearInputs = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    document.querySelector("#createDescription").value = "";
  };

  // handle form submission for project creation
  const handleCreate = async (e) => {
    let isMounted = true;
    const controller = new AbortController();
    e.preventDefault();
    let formData = { ...values };
    delete formData.status;
    try {
      await axiosPrivate.post(
        "/projects",

        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const res = await axiosPrivate.get("/projects", {
        signal: controller.signal,
      });
      clearInputs();
      setErrMsg("");
      setSuccess("Project Created!");

      setValues();
      isMounted && setProjects(res.data.projects);
    } catch (err) {
      setErrMsg(err?.response?.data?.error?.message);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  return (
    <>
      <Sidebar />
      <section className="pages">
        <Breadcrumb page="Projects" />
        <div className="container">
          {auth.user.isAdmin && <CreateBtn name={"Project"} />}

          {/* error message */}
          {errMsg ? <ErrorMsg errMsg={errMsg} setErrMsg={setErrMsg} /> : null}

          {/* success message */}
          {success ? (
            <SuccessMsg success={success} setSuccess={setSuccess} />
          ) : null}

          {/* all projects */}
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
        <CreateModal onChange={onChange} handleCreate={handleCreate} />
        {/* end create project modal */}
      </section>
    </>
  );
};

export default Projects;
