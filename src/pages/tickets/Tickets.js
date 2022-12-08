// Ticket page component

import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import useAuth from "../../hooks/useAuth";
import CreateBtn from "../../components/createBtn/CreateBtn";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import SuccessMsg from "../../components/successMsg/SuccessMsg";
import TicketBox from "../tickets/ticketBox/TicketBox";
import "./ticketBox/TicketBox.scss";

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

  // get all tickets
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTickets = async () => {
      try {
        const res = await axiosPrivate.get(`/tickets`, {
          signal: controller.signal,
        });
        isMounted && setAllTickets(res.data.tickets);
        setShowTickets(res.data.tickets);

        setAssignedTickets(
          res.data.tickets.filter(
            (ticket) => ticket.assignedTo === auth?.user?.empNumber
          ) || 0
        );
        setIncompleteTickets(
          res.data.tickets.filter(
            (ticket) => ticket.status === "In Progress"
          ) || 0
        );
        setCompleteTickets(
          res.data.tickets.filter((ticket) => ticket.status === "Complete") || 0
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
                        color={"#ff5050"}
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
                        color={"#00d09c"}
                      />
                    )}
                    {/* end ticket box container */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tickets;
