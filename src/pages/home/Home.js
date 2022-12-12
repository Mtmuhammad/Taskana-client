// Home page component

import { React, useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Home.scss";
import HomeBox from "../../components/homeBox/HomeBox";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import ProjectTable from "./projectTable/ProjectTable";
import UserTable from "./userTable/UserTable";
import CreateBtn from "../../components/createBtn/CreateBtn";
import CreateModal from "./createUser/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import SuccessMsg from "../../components/successMsg/SuccessMsg";

const Home = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState();
  const [projects, setProjects] = useState();
  const [tasks, setTasks] = useState();
  const [tickets, setTickets] = useState();
  const [assignedTickets, setAssignedTickets] = useState();
  const [values, setValues] = useState({});
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

  // get all tasks from user
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTasks = async () => {
      try {
        const res = await axiosPrivate.get(`/tasks/${auth.user.empNumber}`, {
          signal: controller.signal,
        });
        isMounted && setTasks(res.data.tasks);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getTasks();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate, auth?.user?.empNumber]);

  // get all users
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get(`/users`, {
          signal: controller.signal,
        });
        isMounted && setUsers(res.data.users);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  // get all Tickets
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTickets = async () => {
      try {
        const res = await axiosPrivate.get(`/tickets`, {
          signal: controller.signal,
        });
        isMounted && setTickets(res.data.tickets);
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
  }, [axiosPrivate, location, navigate]);

  // get all assignedTickets
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAssignedTickets = async () => {
      try {
        const res = await axiosPrivate.get(
          `/tickets/assigned/${auth.user.empNumber}`,
          {
            signal: controller.signal,
          }
        );
        isMounted && setAssignedTickets(res.data.tickets);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getAssignedTickets();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate, auth?.user?.empNumber]);

  // clear all inputs from Modal
  const clearInputs = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    document.querySelector("#empRole").value = "";
  };

  // set input values in state
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle creation of user account
  const handleCreate = async (e) => {
    let isMounted = true;
    const controller = new AbortController();
    e.preventDefault();
    let formData = { ...values };
    formData.isAdmin = formData.isAmin === true;
    try {
      await axiosPrivate.post(
        "/users",

        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const res = await axiosPrivate.get("/users", {
        signal: controller.signal,
      });
      clearInputs();
      setErrMsg("");
      setSuccess("User Created!");

      setValues();
      isMounted && setUsers(res.data.users);
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
        <Breadcrumb page="Dashboard" />

        {/* create user btn */}
        {auth?.user.isAdmin && <CreateBtn name={"User"} />}
        {/* error message */}
        {errMsg && <ErrorMsg errMsg={errMsg} setErrMsg={setErrMsg} />}

        {/* success message */}
        {success && <SuccessMsg success={success} setSuccess={setSuccess} />}

        {/* icon boxes */}
        <div className="p-0 container">
          <div className="row">
            <HomeBox
              bgColor="#00d09c90"
              number={projects && projects.length}
              type="Total Projects"
              icon="bx bx-briefcase-alt icon"
            />
            <HomeBox
              bgColor="#15cfff90"
              number={tasks && tasks.length}
              type="Total Tasks"
              icon="bx bx-clipboard icon"
            />
            <HomeBox
              bgColor="#ffc36d90"
              number={assignedTickets && assignedTickets.length}
              type="Assigned Tickets"
              icon="bx bx-box"
            />
            <HomeBox
              bgColor="#ff505090"
              number={tickets && tickets.length}
              type="Total Tickets"
              icon="bx bx-note icon"
            />
          </div>
        </div>
        {/* end icon boxes */}

        <div className="container p-0">
          <div className="row">
            {projects && <ProjectTable projects={projects} />}
            {users && (
              <UserTable
                setErrMsg={setErrMsg}
                setSuccess={setSuccess}
                setUsers={setUsers}
                users={users}
              />
            )}
          </div>
        </div>

        <CreateModal onChange={onChange} handleCreate={handleCreate} />
      </section>
    </>
  );
};

export default Home;
