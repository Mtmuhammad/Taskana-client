import { useState, useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth"
import "../register/Register.scss";
import axios from "../../http-common";
import {Link, useNavigate, useLocation} from "react-router-dom"



// password REGEX (1 lowercase letter, 1 uppercase letter, 1 number and 1 special character)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,20}$/;

// email REGEX
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

const Login = ({isDark}) => {
  const { setAuth, persist, setPersist} = useAuth();

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const emailRef = useRef();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
 

  // set focus on first input
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // check for valid email
  useEffect(() => {
    let email = values.email;
    email.length > 0 && EMAIL_REGEX.test(email)
      ? setValidEmail(true)
      : setValidEmail(false);
  }, [values]);

  // check for valid password and matching password
  useEffect(() => {
    let password = values.password;
    password.length > 0 && PWD_REGEX.test(password)
      ? setValidPwd(true)
      : setValidPwd(false);
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
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = { ...values };
    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setSuccess(true);
      const accessToken = res?.data?.token;
      const user = res?.data?.user;
      const role = res?.data?.role;
      
      setAuth({ role, user, accessToken });
      clearInputs();
      setErrMsg("");
      
      navigate(from, {replace: true})
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response!");
      } else {
        setErrMsg(err.response.data.error.message);
      }
    }
  };

  // set persist value
  useEffect(() => {
    localStorage.setItem("persist", persist)
  },[persist])


  //toggle persist login 
  const togglePersist = () => {
    setPersist(prev => !prev)
  }

  return (
    <>
      <nav
        className="navbar navbar-light navbar-expand-md px-0 mx-auto bg-transparent"
        role="navigation"
        style={{ width: "90%" }}
      >
        <a
          aria-current="page"
          className="register-link mt-3 navbar-brand d-flex align-items-center"
          href="/"
        >
          <img className="register-logo" alt="logo" src={isDark === 'true' ? "./taskana-main-dark.svg" : "./taskana-main.svg" } />
        </a>
      </nav>
      <div className="container register d-flex align-items-center justify-content-center">
        <div className="border-0" style={{ width: "100%", maxWidth: "375px" }}>
          <div className="card-body p-4 mx-auto">
            <div className="mt-5">
              <p className="h1 mb-5 text-center fw-bold">Login to Account</p>
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
                    ref={emailRef}
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

              
              <button
                disabled={
                  validEmail &&
                  validPwd 
                    ? false
                    : true
                }
                type="submit"
                className="btn btn-block w-100 my-5"
              >
               Login
              </button>
              <div className="text-center persistCheck">
                <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} />
                <label htmlFor="persist">Trust This Device</label>
              </div>
            </form>

            <p
              style={{ fontSize: "1.5rem" }}
              className="h6 text-center mt-5 mb-3"
            >
              Don't have an account?{" "}
              <Link
                className="nav-link d-inline p-0"
                to="/register"
                style={{ fontWeight: "700" }}
              >
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
