// Table to display users form db
import React from "react";
import useAuth from "../../../hooks/useAuth";
import EditModal from "../editUser/EditModal";
import DeleteModal from "../deleteUser/DeleteModal";

const UserTable = ({ setSuccess, setErrMsg, setUsers, users }) => {
  const { auth } = useAuth();
  return (
    <div className="mb-5 col-12 col-lg-6 d-flex align-items-stretch">
      <div data-testid="user-table" className="table-style card w-100">
        <div className="card-body">
          <div className="d-md-flex">
            <h3 className="card-title">Team Members</h3>
          </div>
          <div>
            <div className="table-responsive mt-3">
              <table className="table stylish-table v-middle mb-0 no-wrap">
                <thead>
                  <tr>
                    <th className="border-0 text-muted fw-normal">Full Name</th>
                    <th className="border-0 text-muted fw-normal">Email</th>
                    <th className="border-0 text-muted fw-normal">Role</th>
                    {auth?.user?.isAdmin && (
                      <th className="border-0 text-muted fw-normal">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => (
                    <tr key={index} className="h5">
                      <td>
                        <p className="font-weight-medium mb-0">
                          {user?.firstName} {user?.lastName}
                        </p>
                      </td>
                      <td>
                        <span className="badge bg-success px-2 py-1">
                          {user?.email}
                        </span>
                      </td>
                      <td>{user?.empRole}</td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          <button
                            type="button"
                            className="text-warning btn btn-outline-secondary"
                            data-bs-toggle="modal"
                            data-bs-target={`#editUser${user?.empNumber}`}
                          >
                            <i className="bx bxs-edit"></i>
                          </button>
                          <EditModal
                            key={user?.empNumber}
                            setSuccess={setSuccess}
                            setErrMsg={setErrMsg}
                            setUsers={setUsers}
                            user={user}
                          />
                          <button
                            type="button"
                            className="text-danger btn btn-outline-secondary"
                            data-bs-toggle="modal"
                            data-bs-target={`#deleteUser${user?.empNumber}`}
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                          <DeleteModal
                            key={user?.empNumber}
                            setSuccess={setSuccess}
                            setErrMsg={setErrMsg}
                            setUsers={setUsers}
                            user={user}
                            users={users}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
