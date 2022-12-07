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
import CreateBtn from "../../components/createBtn/CreateBtn"
import "./taskItem/TaskItem.scss";

const Tasks = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [userTasks, setUserTasks] = useState();
  const [important, setImportant] = useState();
  const [complete, setComplete] = useState();
  const [filter, setFilter] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [showImportant, setShowImportant] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

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
        setImportant(
          res.data.tasks.filter((task) => task.important === true) || 0
        );
        setComplete(
          res.data.tasks.filter((task) => task.status === "Completed") || 0
        );
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

  // clear search input
  const clearSearch = () => {
    document.querySelector("#task-search").value = "";
  };

  // show all tasks
  const handleAll = () => {
    setShowComplete(false);
    setShowImportant(false);
    setShowFilter(false);
    setShowAll(true);
    document.querySelector("#all").classList.add("task-active");
    document.querySelector("#important").classList.remove("task-active");
    document.querySelector("#complete").classList.remove("task-active");
    clearSearch();
  };

  // show important tasks
  const handleImportant = () => {
    setShowAll(false);
    setShowComplete(false);
    setShowFilter(false);
    setShowImportant(true);
    document.querySelector("#important").classList.add("task-active");
    document.querySelector("#all").classList.remove("task-active");
    document.querySelector("#complete").classList.remove("task-active");
    clearSearch();
  };

  // show complete tasks
  const handleComplete = () => {
    setShowAll(false);
    setShowImportant(false);
    setShowFilter(false);
    setShowComplete(true);
    document.querySelector("#all").classList.remove("task-active");
    document.querySelector("#important").classList.remove("task-active");
    document.querySelector("#complete").classList.add("task-active");
    clearSearch();
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

  return (
    <>
      <Sidebar />
      <section className="pages">
        <Breadcrumb page="Tasks" />

        {/* create task btn */}
        <CreateBtn name={"Task"}/>

        {/* error message */}
        {errMsg && <ErrMsg errorMsg={errMsg} setErrMsg={setErrMsg} />}

        {/* success message */}
        {success && <SuccessMsg success={success} setSuccess={setSuccess} />}

        {/* filer btn group */}
        <div class="tasks card mx-auto overflow-auto">
          <div class="row">
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
              <div id="all-todo-container" class="p-3">
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
      </section>
    </>
  );
};

export default Tasks;
