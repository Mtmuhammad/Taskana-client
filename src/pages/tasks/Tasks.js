import Sidebar from "../../components/sidebar/Sidebar";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TaskItem from "./taskItem/TaskItem";
import FilterBtn from "../tasks/filterBtn/FilterBtn";
import FilterInput from "../tasks/filterInput/FilterInput";
import SuccessMsg from "../../components/successMsg/SuccessMsg";
import ErrMsg from "../../components/errorMsg/ErrorMsg";
import CreateBtn from "../../components/createBtn/CreateBtn";
import CreateModal from "../tasks/createTask/CreateModal";
import "./taskItem/TaskItem.scss";

const Tasks = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [userTasks, setUserTasks] = useState();
  const [important, setImportant] = useState();
  const [complete, setComplete] = useState();
  const [filter, setFilter] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showImportant, setShowImportant] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
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
    setImportant(res.data.tasks.filter((task) => task.important === true) || 0);
    setComplete(
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
    setShowComplete(false);
    setShowImportant(false);
    setShowFilter(false);
    setShowAll(true);
    toggleActive("all", "important", "complete");
    clearInputs();
  };

  // show important tasks
  const handleImportant = () => {
    setShowAll(false);
    setShowComplete(false);
    setShowFilter(false);
    setShowImportant(true);
    toggleActive("important", "all", "complete");
    clearInputs();
  };

  // show complete tasks
  const handleComplete = () => {
    setShowAll(false);
    setShowImportant(false);
    setShowFilter(false);
    setShowComplete(true);
    toggleActive("complete", "all", "important");
    clearInputs();
  };

  // filter task results by title and description from text input
  const handleChange = (e) => {
    if (e.target.value === "") {
      setShowFilter(false);
      setFilter();
      setShowAll(true);
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
    setFilter(unique);
    setShowAll(false);
    setShowImportant(false);
    setShowComplete(false);
    setShowFilter(true);
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
        {errMsg ? <ErrMsg errorMsg={errMsg} setErrMsg={setErrMsg} /> : null}

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
              tasks={important}
            />
            <FilterBtn
              onClick={handleComplete}
              title="complete"
              icon="bx bx-paper-plane"
              tasks={complete}
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
                {showAll &&
                  userTasks &&
                  userTasks.map((task) => (
                    <TaskItem
                      setImportant={setImportant}
                      setComplete={setComplete}
                      setErrMsg={setErrMsg}
                      setUserTasks={setUserTasks}
                      key={task.id}
                      task={task}
                    />
                  ))}
                {/* important tasks */}
                {showImportant &&
                  important &&
                  important.map((task) => (
                    <TaskItem
                      setImportant={setImportant}
                      setComplete={setComplete}
                      setErrMsg={setErrMsg}
                      setUserTasks={setUserTasks}
                      key={task.id}
                      task={task}
                    />
                  ))}
                {/* complete tasks */}
                {showComplete &&
                  complete &&
                  complete.map((task) => (
                    <TaskItem
                      setImportant={setImportant}
                      setComplete={setComplete}
                      setErrMsg={setErrMsg}
                      setUserTasks={setUserTasks}
                      key={task.id}
                      task={task}
                    />
                  ))}
                {/* task from search results */}
                {showFilter &&
                  filter &&
                  filter.map((task) => (
                    <TaskItem
                      setImportant={setImportant}
                      setComplete={setComplete}
                      setErrMsg={setErrMsg}
                      setUserTasks={setUserTasks}
                      key={task.id}
                      task={task}
                    />
                  ))}
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
