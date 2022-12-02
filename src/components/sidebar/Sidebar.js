// Sidebar navigation 

import "./Sidebar.scss";
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const body = document.querySelector("body");

const Sidebar = ({ page }) => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark") === "true"
  );
  const logout = useLogout()
  const navigate = useNavigate()

  const signOut = async () => {
    await logout()
    navigate('/')
  }

  //save dark/light mode to local storage
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  // toggle light/dark mode 
  const toggleDark = () => {
    body.classList.toggle("dark");
    body.classList.contains("dark") ? setIsDark(true) : setIsDark(false);
  };

  return (
    <>
      <nav className={isOpen ? "sidebar" : "sidebar close"}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="taskana-alt.svg" alt="Taskana alt" />
            </span>

            <div className="text logo-text">
              <span data-testid="first-name" className="name">{auth?.user?.firstName}</span>
              <span data-testid="last-name" className="name"> {auth?.user?.lastName}</span>
              <span data-testid="role" className="role">{auth?.user?.empRole}</span>
            </div>
          </div>
          <i
            onClick={() => setIsOpen(!isOpen)}
            className="bx bx-menu toggle"
          ></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li
              onClick={() => !isOpen && setIsOpen(true)}
              className="search-box"
            >
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>

            <ul className="p-0 menu-links">
              <li className="nav-link">
                <NavLink
                data-testid="sidebar-link"
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "sidebar-links active" : "sidebar-links"
                  }
                  end
                >
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink
                data-testid="sidebar-link"
                  to="/projects"
                  className={({ isActive }) =>
                    isActive ? "sidebar-links active" : "sidebar-links"
                  }
                >
                  <i className="bx bx-briefcase-alt icon"></i>
                  <span className="text nav-text">Projects</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink
                data-testid="sidebar-link"
                  to="/tasks"
                  className={({ isActive }) =>
                    isActive ? "sidebar-links active" : "sidebar-links"
                  }
                >
                  <i className="bx bx-clipboard icon"></i>
                  <span className="text nav-text">Tasks</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink
                data-testid="sidebar-link"
                  to="/tickets"
                  className={({ isActive }) =>
                    isActive ? "sidebar-links active" : "sidebar-links"
                  }
                >
                  <i className="bx bx-note icon"></i>
                  <span className="text nav-text">Tickets</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink
                data-testid="sidebar-link"
                  to="/team"
                  className={({ isActive }) =>
                    isActive ? "sidebar-links active" : "sidebar-links"
                  }
                >
                  <i className="bx bx-group icon"></i>
                  <span className="text nav-text">Team</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink
                data-testid="sidebar-link"
                  to="/account"
                  className={({ isActive }) =>
                    isActive ? "sidebar-links active" : "sidebar-links"
                  }
                >
                  <i className="bx bx-folder-open icon"></i>
                  <span className="text nav-text">Account</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <NavLink
              onClick={signOut}
              data-testid="sidebar-link"
                to="/logout"
                className={({ isActive }) =>
                  isActive ? "sidebar-links active" : "sidebar-links"
                }
              >
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </NavLink>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>

              <div data-testid="toggle-switch" onClick={toggleDark} className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
