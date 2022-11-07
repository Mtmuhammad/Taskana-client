import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import "./styles/base/_base.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/requireAuth/RequireAuth";

const dark = localStorage.getItem("isDark")
const body = document.querySelector("body");
dark === 'false' ? body.classList.remove("dark") : body.classList.add("dark");


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login isDark={dark} />}/>
        <Route path="register" element={<Register isDark={dark} />} />

        {/* protected routes for user */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* catch all */}
      </Route>
    </Routes>
  );
}

export default App;
