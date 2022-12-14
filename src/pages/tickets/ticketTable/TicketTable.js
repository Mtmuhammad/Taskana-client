// Table to display all tickets on ticket page

import { React } from "react";
import DataTable from "react-data-table-component";
import "../ticketBox/TicketBox.scss";
import useAuth from "../../../hooks/useAuth";
import EditModal from "../editTicket/EditModal";
import DeleteModal from "../deleteTicket/DeleteModal";

const TicketTable = ({
  allTickets,
  setAllTickets,
  setShowTickets,
  setAssignedTickets,
  setIncompleteTickets,
  setOpenTickets,
  projects,
  users,
  showTickets,
  setIsLoading,
  setSuccess,
  setErrMsg,
}) => {
  const { auth } = useAuth();

  const adminColumns = [
    {
      name: "Ticket ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status === "Complete" ? (
          <span className="badge bg-success">{row.status}</span>
        ) : row.status === "In Progress" ? (
          <span className="badge bg-warning">{row.status}</span>
        ) : (
          <span className="badge bg-danger">{row.status}</span>
        ),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Project",
      selector: (row) => row.projectName,
      sortable: true,
    },
    {
      name: "Assigned",
      selector: (row) => row.assignedName,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            className="ticket-btn btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target={`#editTicket${row.id}`}
          >
            <i style={{ color: "#ffc36d" }} className="bx bxs-edit"></i>
          </button>
          <EditModal
            setSuccess={setSuccess}
            setErrMsg={setErrMsg}
            setIsLoading={setIsLoading}
            setAllTickets={setAllTickets}
            setShowTickets={setShowTickets}
            setAssignedTickets={setAssignedTickets}
            setIncompleteTickets={setIncompleteTickets}
            setOpenTickets={setOpenTickets}
            users={users}
            projects={projects}
            ticket={row}
          />
          <button
            type="button"
            className="ticket-btn btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target={`#deleteTicket${row.id}`}
          >
            <i style={{ color: "#ff5050" }} className="bx bx-trash"></i>
          </button>
          <DeleteModal
            setSuccess={setSuccess}
            setErrMsg={setErrMsg}
            setIsLoading={setIsLoading}
            setAllTickets={setAllTickets}
            setShowTickets={setShowTickets}
            setAssignedTickets={setAssignedTickets}
            setIncompleteTickets={setIncompleteTickets}
            setOpenTickets={setOpenTickets}
            ticket={row}
          />
        </div>
      ),
      sortable: true,
    },
  ];

  const userColumns = [
    {
      name: "Ticket ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status === "Complete" ? (
          <span className="badge bg-success">{row.status}</span>
        ) : row.status === "In Progress" ? (
          <span className="badge bg-warning">{row.status}</span>
        ) : (
          <span className="badge bg-danger">{row.status}</span>
        ),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Project",
      selector: (row) => row.projectName,
      sortable: true,
    },
    {
      name: "Assigned",
      selector: (row) => row.assignedName,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) =>
        row.assignedTo === auth?.user?.empNumber ? (
          <div className="" role="group" aria-label="Basic outlined example">
            <button
              type="button"
              className="ms-3 ticket-btn btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target={`#editTicket${row.id}`}
            >
              <i style={{ color: "#ffc36d" }} className="bx bxs-edit"></i>
            </button>
            <EditModal
              setSuccess={setSuccess}
              setErrMsg={setErrMsg}
              setIsLoading={setIsLoading}
              setAllTickets={setAllTickets}
              setShowTickets={setShowTickets}
              setAssignedTickets={setAssignedTickets}
              setIncompleteTickets={setIncompleteTickets}
              setOpenTickets={setOpenTickets}
              users={users}
              projects={projects}
              ticket={row}
            />
          </div>
        ) : null,
      sortable: true,
    },
  ];

  // get project name

  const ExpandedComponent = ({ data }) => (
    <pre className="ms-5 my-4 h4">
      <strong>Title: {data.title}</strong>
      <p className="mt-4">{data.description}</p>
    </pre>
  );

  // filter tickets with search input
  const filterTickets = (e) => {
    let value = e.target.value;

    if (value.length === 0) {
      setShowTickets();
      return setShowTickets(allTickets);
    }
    let filteredTitle = showTickets.filter((ticket) => {
      return ticket.title.toLowerCase().includes(value.toLowerCase());
    });

    let filteredDesc = showTickets.filter((ticket) => {
      return ticket.description.toLowerCase().includes(value.toLowerCase());
    });

    let results = [...filteredDesc, ...filteredTitle];
    const unique = [...new Map(results.map((r) => [r.id, r])).values()];

    setShowTickets(unique);
  };

  return (
    <>
      <div>
        <div className="col-12">
          <div className="d-flex justify-content-end">
            <div className="ticketInput" style={{ width: "50%" }}>
              <label></label>
              <input
                id="ticket-search"
                type="search"
                className="form-control mb-2 form-control-sm"
                placeholder="Search ticket by title or description"
                onChange={filterTickets}
              />
            </div>
          </div>
        </div>
      </div>
      <DataTable
        columns={auth?.user?.isAdmin ? adminColumns : userColumns}
        data={showTickets}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
      />
    </>
  );
};

export default TicketTable;
