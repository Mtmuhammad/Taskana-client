import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Home.scss";
import HomeBox from "../../components/homeBox/HomeBox";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import ProjectTable from "./projectTable/ProjectTable";
import UserTable from "./userTable/UserTable";


const Home = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState();
  const [projects, setProjects] = useState();
  const [tasks, setTasks] = useState();
  const [tickets, setTickets] = useState()
  const [assignedTickets, setAssignedTickets] = useState()
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

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
        const res = await axiosPrivate.get(`/users/`, {
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
        const res = await axiosPrivate.get(`/tickets/`, {
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
        const res = await axiosPrivate.get(`/tickets/assigned/${auth.user.empNumber}`, {
          signal: controller.signal,
        });
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

  return (
    <>
      <Sidebar />
      <section className="pages">
        <Breadcrumb page="Dashboard" />

        {/* icon boxes */}
        <div className="container">
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
              icon="bx bx-note icon"/>
          </div>
        </div>
        {/* end icon boxes */}

        <div className="container">
          <div className="row">
            {projects && <ProjectTable projects={projects} />}
            {users && <UserTable users={users} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
