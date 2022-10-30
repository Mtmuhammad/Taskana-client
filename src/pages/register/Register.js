import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import "./Register.scss";
import axios from "../../http-common";

// first and last name REGEX
const NAME_REGEX = /^(?=.*[A-Z])[a-zA-Z-" * "]{2,20}$/;

// password REGEX (1 lowercase letter, 1 uppercase letter, 1 number and 1 special character)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,20}$/;

// email REGEX
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGISTER_URL = "/auth/register";

const Register = () => {
  const { setAuth } = useContext(AuthContext);
  const firstNameRef = useRef();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    matchPwd: "",
    empRole: "",
  });

  const [validFirst, setValidFirst] = useState(false);
  const [validLast, setValidLast] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // set focus on first input
  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  // check for valid firstName and lastName
  useEffect(() => {
    let { firstName, lastName } = values;
    firstName.length > 0 && NAME_REGEX.test(firstName)
      ? setValidFirst(true)
      : setValidFirst(false);
    lastName.length > 0 && NAME_REGEX.test(lastName)
      ? setValidLast(true)
      : setValidLast(false);
  }, [values]);

  // check for valid email
  useEffect(() => {
    let email = values.email;
    email.length > 0 && EMAIL_REGEX.test(email)
      ? setValidEmail(true)
      : setValidEmail(false);
  }, [values]);

  // check for valid password and matching password
  useEffect(() => {
    let { password, matchPwd } = values;
    password.length > 0 && PWD_REGEX.test(password)
      ? setValidPwd(true)
      : setValidPwd(false);
    matchPwd.length > 0 && PWD_REGEX.test(matchPwd)
      ? setValidMatchPwd(true)
      : setValidMatchPwd(false);
  }, [values]);

  // check for valid select option
  useEffect(() => {
    values.empRole !== "" ? setValidInput(true) : setValidInput(false);
  }, [values]);

  // set input values in state
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // clear input on success
  const clearInputs = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    document.querySelector("#empRole").value = "";
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = { ...values };
    delete formData.matchPwd;
    try {
      const res = await axios.post(REGISTER_URL, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      setAuth({ user, accessToken });
      clearInputs();
      setErrMsg("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response!");
      } else {
        setErrMsg(err.response.data.error.message);
      }
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-light navbar-expand-md px-0 mx-auto bg-transparent"
        role="navigation"
        style={{ width: "90%" }}
      >
        <a
          aria-current="page"
          className="mt-3 navbar-brand d-flex align-items-center"
          href="/"
        >
          <img className="register-logo" alt="logo" src="./taskana-main.svg" />
        </a>
      </nav>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="border-0" style={{ width: "100%", maxWidth: "375px" }}>
          <div className="card-body p-4 mx-auto">
            <div className="mt-5">
              <p className="h1 mb-5 text-center fw-bold">Create Account</p>
            </div>
            {/* error message */}
            {errMsg && (
              <div
                className="d-flex justify-content-between alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <p style={{ fontSize: "1.3rem", marginBottom: "0" }}>
                  <strong>Error!</strong> {errMsg}
                </p>
                <i
                  type="button"
                  className="close text-danger bx bx-x"
                  data-dismiss="alert"
                  aria-label="Close"
                  style={{ fontSize: "2.3rem" }}
                  onClick={() => setErrMsg("")}
                ></i>
              </div>
            )}

            {/* success message */}
            {success && (
              <div
                className="d-flex justify-content-between alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <p style={{ fontSize: "1.3rem", marginBottom: "0" }}>
                  <strong>Success!</strong>
                </p>
                <i
                  type="button"
                  className="close text-success bx bx-x"
                  data-dismiss="alert"
                  aria-label="Close"
                  style={{ fontSize: "2.3rem" }}
                  onClick={() => setSuccess(false)}
                ></i>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              data-testid="register-form"
              style={{ minWidth: "250px" }}
            >
              {/* first name */}
              <div className="form-input mb-3">
                <label className="text-muted m-0" htmlFor="firstName">
                  First Name
                </label>
                {values.firstName.length > 0 && !validFirst && (
                  <i className="text-danger bx bx-x"></i>
                )}

                {values.firstName.length > 0 && validFirst && (
                  <i className="bx bx-check"></i>
                )}

                <div className="md-form form-lg md-outline">
                  <input
                    autoComplete="off"
                    ref={firstNameRef}
                    type="text"
                    className="form-control form-control-lg bg rounded-0 mt-n3"
                    id="firstName"
                    placeholder="First Name"
                    name="firstName"
                    onChange={onChange}
                    required
                  />
                </div>
                {!validFirst && values.firstName.length > 0 && (
                  <span className="text-danger">
                    Must include initial capital letter, be 2-20 characters and
                    must not include special characters or numbers!
                  </span>
                )}
              </div>

              {/* last name */}
              <div className="form-input mb-3">
                <label className="text-muted m-0" htmlFor="lastName">
                  Last Name
                </label>
                {values.lastName.length > 0 && !validLast && (
                  <i className="text-danger bx bx-x"></i>
                )}

                {values.lastName.length > 0 && validLast && (
                  <i className="bx bx-check"></i>
                )}

                <div className="md-form form-lg md-outline">
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control form-control-lg bg rounded-0 mt-n3"
                    id="lastName"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={onChange}
                    required
                  />
                </div>
                {!validLast && values.lastName.length > 0 && (
                  <span className="text-danger">
                    Must include initial capital letter, be 2-20 characters and
                    must not include special characters or numbers!
                  </span>
                )}
              </div>

              {/* email */}
              <div className="form-input mb-3">
                <label className="text-muted m-0" htmlFor="email">
                  E-mail
                </label>
                {values.email.length > 0 && !validEmail && (
                  <i className="text-danger bx bx-x"></i>
                )}

                {values.email.length > 0 && validEmail && (
                  <i className="bx bx-check"></i>
                )}

                <div className="md-form form-lg md-outline">
                  <input
                    autoComplete="off"
                    type="email"
                    className="form-control form-control-lg bg rounded-0 mt-n3"
                    id="email"
                    placeholder="E-mail address"
                    name="email"
                    onChange={onChange}
                    required
                  />
                </div>
                {!validEmail && values.email.length > 0 && (
                  <span className="text-danger">
                    Must be a valid e-mail address!
                  </span>
                )}
              </div>

              {/* password */}
              <div className="form-input mb-3">
                <label className="text-muted m-0" htmlFor="password">
                  Password
                </label>
                {values.password.length > 0 && !validPwd && (
                  <i className="text-danger bx bx-x"></i>
                )}

                {values.password.length > 0 && validPwd && (
                  <i className="bx bx-check"></i>
                )}

                <div className="md-form form-lg md-outline">
                  <input
                    autoComplete="off"
                    type="password"
                    className="form-control form-control-lg bg rounded-0 mt-n3"
                    id="password"
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                    required
                  />
                </div>
                {!validPwd && values.password.length > 0 && (
                  <span className="text-danger">
                    Must be 8-20 characters and include at least 1 uppercase
                    letter, 1 special character, and 1 number!"
                  </span>
                )}
              </div>

              {/* confirm password */}
              <div className="form-input mb-3">
                <label className="text-muted m-0" htmlFor="matchPwd">
                  Confirm Password
                </label>
                {values.matchPwd.length > 0 && !validMatchPwd && (
                  <i className="text-danger bx bx-x"></i>
                )}

                {values.matchPwd.length > 0 && validMatchPwd && (
                  <i className="bx bx-check"></i>
                )}

                <div className="md-form form-lg md-outline">
                  <input
                    autoComplete="off"
                    type="password"
                    className="form-control form-control-lg bg rounded-0 mt-n3"
                    id="matchPwd"
                    placeholder="Re-enter password"
                    name="matchPwd"
                    onChange={onChange}
                    required
                  />
                </div>
                {!validMatchPwd && values.matchPwd.length > 0 && (
                  <span className="text-danger">Passwords must match!</span>
                )}
              </div>

              {/* empRole */}
              <div className="form-input">
                <label className="text-muted m-0" htmlFor="empRole">
                  Employee Role
                </label>
                {values.empRole.length > 0 && validInput && (
                  <i className="bx bx-check"></i>
                )}
                <div className="md-form form-lg md-outline">
                  <select
                    onChange={onChange}
                    className="form-select"
                    id="empRole"
                    name="empRole"
                  >
                    <option value="" defaultValue>
                      Choose a role:
                    </option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Web Designer">Web Designer</option>
                    <option value="Mobile Developer">Mobile Developer</option>
                    <option value="Software Engineer">Software Engineer</option>
                  </select>
                  {!validInput && (
                    <span className="text-danger">Please choose a role!</span>
                  )}
                </div>
              </div>
              <button
                disabled={
                  validFirst &&
                  validLast &&
                  validEmail &&
                  validPwd &&
                  validMatchPwd &&
                  validInput
                    ? false
                    : true
                }
                type="submit"
                className="btn btn-block w-100 my-5"
              >
                Sign Up
              </button>
            </form>

            <p
              style={{ fontSize: "1.5rem" }}
              className="text-muted text-center mb-3"
            >
              Have an Account?{" "}
              <a
                className="nav-link d-inline p-0 text-dark"
                href="/login"
                style={{ fontWeight: "700" }}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
