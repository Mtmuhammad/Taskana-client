// render ui for child components rendered in App component
import React from 'react'
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
