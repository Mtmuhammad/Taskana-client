// Ticket page component

import { React, useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import useAuth from "../../hooks/useAuth";
import CreateBtn from "../../components/createBtn/CreateBtn";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import SuccessMsg from "../../components/successMsg/SuccessMsg";
import Spinner from "../../components/spinner/Spinner";
import TicketBox from "../tickets/ticketBox/TicketBox";
import "./ticketBox/TicketBox.scss";
import TicketTable from "./ticketTable/TicketTable";
import CreateModal from "./createTicket/CreateModal";

const Tickets = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [allTickets, setAllTickets] = useState();
  const [assignedTickets, setAssignedTickets] = useState();
  const [incompleteTickets, setIncompleteTickets] = useState();
  const [completeTickets, setCompleteTickets] = useState();
  const [showTickets, setShowTickets] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ createdBy: auth?.user?.empNumber });
  const [users, setUsers] = useState();
  const [projects, setProjects] = useState();

  // get all tickets, users, and projects. Filter tickets
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);

    const getTickets = async () => {
      try {
        const res = await axiosPrivate.get(`/tickets`, {
          signal: controller.signal,
        });

        const userRes = await axiosPrivate.get(`/users`, {
          signal: controller.signal,
        });

        const projectRes = await axiosPrivate.get(`/projects`, {
          signal: controller.signal,
        });

        let tickets = res.data.tickets.map(async (ticket) => {
          let result = await axiosPrivate.get(`/projects/${ticket.projectId}`, {
            signal: controller.signal,
          });
          let nameResult = await axiosPrivate.get(
            `/users/${ticket.assignedTo}`,
            {
              signal: controller.signal,
            }
          );
          ticket[
            "assignedName"
          ] = `${nameResult.data.user.firstName} ${nameResult.data.user.lastName}`;
          ticket["projectName"] = result.data.project.name;
          return ticket;
        });

        tickets = await Promise.all(tickets);

        isMounted && setAllTickets(tickets);
        setShowTickets(tickets);
        setIsLoading(false);
        setUsers(userRes.data.users);
        setProjects(projectRes.data.projects);
        setAssignedTickets(
          tickets.filter(
            (ticket) => ticket.assignedTo === auth?.user?.empNumber
          ) || 0
        );
        setIncompleteTickets(
          tickets.filter((ticket) => ticket.status === "In Progress") || 0
        );
        setCompleteTickets(
          tickets.filter((ticket) => ticket.status === "Complete") || 0
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
  }, [auth?.user?.empNumber, axiosPrivate, location, navigate]);

  // set input values in state
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle form submission for ticket creation
  const handleCreate = async (e) => {
    let isMounted = true;
    const controller = new AbortController();
    e.preventDefault();
    let formData = { ...values };
    formData.projectId = +formData.projectId;
    formData.assignedTo = +formData.assignedTo;

    try {
      await axiosPrivate.post(
        `/tickets`,

        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const res = await axiosPrivate.get(`/tickets`, {
        signal: controller.signal,
      });

      let tickets = res.data.tickets.map(async (ticket) => {
        let result = await axiosPrivate.get(`/projects/${ticket.projectId}`, {
          signal: controller.signal,
        });
        let nameResult = await axiosPrivate.get(`/users/${ticket.assignedTo}`, {
          signal: controller.signal,
        });
        ticket[
          "assignedName"
        ] = `${nameResult.data.user.firstName} ${nameResult.data.user.lastName}`;
        ticket["projectName"] = result.data.project.name;
        return ticket;
      });

      tickets = await Promise.all(tickets);

      isMounted && setAllTickets(tickets);
      setShowTickets();
      setShowTickets(tickets);
      setIsLoading(false);

      setAssignedTickets(
        tickets.filter(
          (ticket) => ticket.assignedTo === auth?.user?.empNumber
        ) || 0
      );
      setIncompleteTickets(
        tickets.filter((ticket) => ticket.status === "In Progress") || 0
      );
      setCompleteTickets(
        tickets.filter((ticket) => ticket.status === "Complete") || 0
      );

      setErrMsg("");
      setSuccess("Ticket Created!");
      clearInputs();
      setValues({ createdBy: auth?.user?.empNumber });
    } catch (err) {
      setErrMsg(err?.response?.data?.error?.message);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  // clear input on success, clear search filter input
  const clearInputs = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    document.querySelector("#createTicketDescription").value = "";
    document.querySelector("#createTicketAssignedTo").value = "";
    document.querySelector("#createTicketProjectId").value = "";
  };

  return (
    <>
      <Sidebar />
      <section className="pages">
        <Breadcrumb page="Tickets" />
        <div className="tickets container">
          {auth?.user?.isAdmin && <CreateBtn name={"Ticket"} />}
          {/* error message */}
          {errMsg ? <ErrorMsg errMsg={errMsg} setErrMsg={setErrMsg} /> : null}

          {/* success message */}
          {success ? (
            <SuccessMsg success={success} setSuccess={setSuccess} />
          ) : null}

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="h2 card-title">Tickets</h4>
                  <div className="row mt-4">
                    {/* ticket box containers */}
                    {allTickets && (
                      <TicketBox
                        name={"Total"}
                        tickets={allTickets}
                        color={"#00d09c"}
                      />
                    )}
                    {incompleteTickets && (
                      <TicketBox
                        name={"In Progress"}
                        tickets={incompleteTickets}
                        color={"#ffc36d"}
                      />
                    )}
                    {assignedTickets && (
                      <TicketBox
                        name={"Assigned"}
                        tickets={assignedTickets}
                        color={"#15cfff"}
                      />
                    )}
                    {completeTickets && (
                      <TicketBox
                        name={"Closed"}
                        tickets={completeTickets}
                        color={"#ff5050"}
                      />
                    )}
                    {/* end ticket box container */}
                  </div>
                  <div className="row">
                    <div className="col-12">
                      {/* loading spinner */}
                      {isLoading && <Spinner />}

                      {/* ticket table */}
                      {showTickets ? (
                        <TicketTable
                        setSuccess={setSuccess}
                        setErrMsg={setErrMsg}
                          users={users}
                          projects={projects}
                          setAllTickets={setAllTickets}
                          showTickets={showTickets}
                          setShowTickets={setShowTickets}
                          setAssignedTickets={setAssignedTickets}
                          setIncompleteTickets={setIncompleteTickets}
                          setCompleteTickets={setCompleteTickets}
                          setIsLoading={setIsLoading}

                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* create task modal */}
        <CreateModal
          projects={projects}
          users={users}
          onChange={onChange}
          handleCreate={handleCreate}
        />
        {/* end create task modal */}
      </section>
    </>
  );
};

export default Tickets;
