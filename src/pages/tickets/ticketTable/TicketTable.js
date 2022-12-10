// Table to display all tickets on ticket page

import { React, useState } from "react";
import DataTable from "react-data-table-component";
import "../ticketBox/TicketBox.scss";
import useAuth from "../../../hooks/useAuth";


const TicketTable = ({ showTickets }) => {
  const { auth } = useAuth();
  const [data, setData] = useState(showTickets);

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
          <button
            type="button"
            className="ticket-btn btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target={`#deleteTicket${row.id}`}
          >
            <i style={{ color: "#ff5050" }} className="bx bx-trash"></i>
          </button>
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
      selector: (row) => row.status,
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
        <>
          <label htmlFor="status" className="form-label"></label>
          <select
            id="ticket-select"
            className="form-select d-inline-block"
            aria-label="Default select Priority"
            name="status"
            data-testid="input"
          >
            <option defaultValue={row?.status}>{row?.status}</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </>
      ),
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

  return (
    <DataTable
      columns={auth?.user?.isAdmin ? adminColumns : userColumns}
      data={data}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      pagination
    />
  );
};

export default TicketTable;
