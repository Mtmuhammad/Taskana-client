import Sidebar from "../../components/sidebar/Sidebar";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import { React, useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TaskItem from "./taskItem/TaskItem";
import FilterBtn from "../tasks/filterBtn/FilterBtn";
import FilterInput from "../tasks/filterInput/FilterInput";
import SuccessMsg from "../../components/successMsg/SuccessMsg";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import CreateBtn from "../../components/createBtn/CreateBtn";
import CreateModal from "../tasks/createTask/CreateModal";
import "./taskItem/TaskItem.scss";

const Tasks = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [showTasks, setShowTasks] = useState();
  const [userTasks, setUserTasks] = useState();
  const [importantTasks, setImportantTasks] = useState();
  const [completeTasks, setCompleteTasks] = useState();
  const [filteredTasks, setFilteredTasks] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    important: "",
    createdBy: auth?.user?.empNumber,
  });

  // get all tasks
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTasks = async () => {
      try {
        const res = await axiosPrivate.get(`/tasks/${auth?.user?.empNumber}`, {
          signal: controller.signal,
        });
        isMounted && setUserTasks(res.data.tasks);
        setShowTasks(res.data.tasks);
        filterTasks(res);
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
  }, [auth?.user?.empNumber, axiosPrivate, location, navigate]);

  // set important and complete state after fetching Tasks
  const filterTasks = (res) => {
    setImportantTasks(
      res.data.tasks.filter((task) => task.important === true) || 0
    );
    setCompleteTasks(
      res.data.tasks.filter((task) => task.status === "Completed") || 0
    );
  };

  // set input values in state
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // clear input on success, clear search filter input
  const clearInputs = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    document.querySelector("#createTaskDescription").value = "";
    document.querySelector("#createTaskImportant").value = "";
    document.querySelector("#task-search").value = "";
  };

  //toggle active class on filter buttons
  const toggleActive = (filter1, filter2, filter3) => {
    document.querySelector(`#${filter1}`).classList.add("task-active");
    document.querySelector(`#${filter2}`).classList.remove("task-active");
    document.querySelector(`#${filter3}`).classList.remove("task-active");
  };

  // show all tasks
  const handleAll = () => {
    setShowTasks(userTasks);
    toggleActive("all", "important", "complete");
    clearInputs();
  };

  // show important tasks
  const handleImportant = () => {
    setShowTasks(importantTasks);
    toggleActive("important", "all", "complete");
    clearInputs();
  };

  // show complete tasks
  const handleComplete = () => {
    setShowTasks(completeTasks);
    toggleActive("complete", "all", "important");
    clearInputs();
  };

  // filter task results by title and description from text input
  const handleChange = (e) => {
    if (e.target.value === "") {
      setShowTasks(userTasks);
      setFilteredTasks();
    }

    document.querySelector("#all").classList.remove("task-active");
    document.querySelector("#important").classList.remove("task-active");
    document.querySelector("#complete").classList.remove("task-active");

    let filteredTitle = userTasks.filter((task) => {
      return task.title.toLowerCase().includes(e.target.value.toLowerCase());
    });

    let filteredDesc = userTasks.filter((task) => {
      return task.description
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    let results = [...filteredDesc, ...filteredTitle];
    const unique = [...new Map(results.map((r) => [r.id, r])).values()];
    setFilteredTasks(unique);
    setShowTasks(unique);
  };

  // handle form submission for task creation
  const handleCreate = async (e) => {
    let isMounted = true;
    const controller = new AbortController();
    e.preventDefault();
    let formData = { ...values };
    formData.important = formData.important === "true";
    try {
      await axiosPrivate.post(
        `/tasks`,

        JSON.stringify(formData),
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
      setErrMsg("");
      setSuccess("Task Created!");
      clearInputs();
      setValues();
      filterTasks(res);
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
        <Breadcrumb page="Tasks" />

        {/* create task btn */}
        <CreateBtn name={"Task"} />

        {/* error message */}
        {errMsg && <ErrorMsg errMsg={errMsg} setErrMsg={setErrMsg} />}

        {/* success message */}
        {success && <SuccessMsg success={success} setSuccess={setSuccess} />}

        {/* filer btn group */}
        <div className="tasks card mx-auto overflow-auto">
          <div className="row">
            <FilterBtn
              onClick={handleAll}
              title="all"
              icon="bx bx-list-ul"
              tasks={userTasks}
            />
            <FilterBtn
              onClick={handleImportant}
              title="important"
              icon="bx bx-star"
              tasks={importantTasks}
            />
            <FilterBtn
              onClick={handleComplete}
              title="complete"
              icon="bx bx-paper-plane"
              tasks={completeTasks}
            />
          </div>
          {/* end filter btn group  */}

          <div id="todo-list-container">
            {/* search input */}
            <FilterInput handleChange={handleChange} />

            {/* task container */}
            <div>
              <div id="all-todo-container" className="p-3">
                {/* all tasks */}
                {showTasks
                  ? showTasks.map((task) => (
                      <TaskItem
                        setShowTasks={setShowTasks}
                        setSuccess={setSuccess}
                        filterTasks={filterTasks}
                        setErrMsg={setErrMsg}
                        setUserTasks={setUserTasks}
                        userTasks={userTasks}
                        key={task.id}
                        task={task}
                      />
                    ))
                  : null}
              </div>
            </div>
            {/* end task container */}
          </div>
        </div>
        {/* create task modal */}
        <CreateModal onChange={onChange} handleCreate={handleCreate} />
        {/* end create task modal */}
      </section>
    </>
  );
};

export default Tasks;
