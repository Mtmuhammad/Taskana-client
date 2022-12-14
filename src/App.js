import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Tasks from "./pages/tasks/Tasks";
import Tickets from "./pages/tickets/Tickets";
import "./styles/base/_base.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/requireAuth/RequireAuth";
import PersistLogin from "./components/persist/PersistLogin";
import React from 'react'

// set light or dark mode on body
const dark = localStorage.getItem("isDark");
const body = document.querySelector("body");
dark === "false" || dark === null ? body.classList.remove("dark") : body.classList.add("dark");

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login isDark={dark} />} />
        <Route path="register" element={<Register isDark={dark} />} />

        {/* protected routes for user */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="projects" element={<Projects />}/>
            <Route path="tasks" element={<Tasks />}/>
            <Route path="tickets" element={<Tickets />}/>
          </Route>
        </Route>

        {/* catch all */}
      </Route>
    </Routes>
  );
}

export default App;
