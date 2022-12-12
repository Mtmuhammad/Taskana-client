// Modal to edit a user

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../../projects/projectCard/ProjectCard.scss";
import { React, useState } from "react";

const EditModal = ({ setUsers, user, setSuccess, setErrMsg }) => {
  const axiosPrivate = useAxiosPrivate();
  const [values, setValues] = useState({});

  // set input values in state
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle form submission to edit user
  const handleEdit = async (e) => {
    let isMounted = true;
    const controller = new AbortController();
    e.preventDefault();
    let formData = { ...values };
    if (formData.isAdmin) formData.isAdmin = formData.isAdmin === true;

    try {
      await axiosPrivate.patch(
        `/users/${user?.empNumber}`,

        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const result = await axiosPrivate.get(`/users`, {
        signal: controller.signal,
      });

      setErrMsg("");
      setSuccess("User Modified!");
      isMounted && setUsers(result.data.users);
    } catch (err) {
      setErrMsg(err?.response?.data?.error?.message);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  return (
    <div
      style={{ color: "black" }}
      className="modal fade"
      id={`editUser${user?.empNumber}`}
      tabIndex="-1"
      aria-hidden="true"
      data-testid="edit-modal"
    >
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              data-testid="header"
              className="modal-title  fw-bold"
              id="editProjectLabel"
            >
              {" "}
              Edit User
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              data-testid="close-btn"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id={`firstName${user?.empNumber}`}
                name="firstName"
                placeholder="What is the user's first name?"
                onChange={onChange}
                data-testid="input"
                defaultValue={user?.firstName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id={`lastName${user?.empNumber}`}
                name="lastName"
                placeholder="What is the user's last name?"
                onChange={onChange}
                data-testid="input"
                defaultValue={user?.lastName}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                autoComplete="off"
                type="email"
                className="form-control"
                id={`email${user?.empNumber}`}
                placeholder="Add user email"
                name="email"
                onChange={onChange}
                data-testid="input"
                defaultValue={user?.email}
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="empRole" className="form-label">
                Employee Role
              </label>
              <select
                onChange={onChange}
                className="form-select"
                id="empRole"
                name="empRole"
                defaultValue={user?.empRole}
              >
                <option value="">Choose a role:</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Web Designer">Web Designer</option>
                <option value="Mobile Developer">Mobile Developer</option>
                <option value="Software Engineer">Software Engineer</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="isAdmin" className="form-label">
                Is this employee admin?
              </label>
              <select
                onChange={onChange}
                className="form-select"
                id="isAdmin"
                name="isAdmin"
                defaultValue={user?.isAdmin}
              >
                <option value="" defaultValue>
                  Choose a value:
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="fs-5 btn btn-secondary"
              data-bs-dismiss="modal"
              data-testid="cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              type="button"
              className="fs-5 btn btn-success"
              data-bs-dismiss="modal"
              data-testid="edit-btn"
            >
              Edit User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
