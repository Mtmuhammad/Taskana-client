// Component to pass down info without props

import { createContext, useState, React } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

  return (
    <AuthContext.Provider value={{ auth, setAuth , persist, setPersist}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
