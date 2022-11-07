import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (auth?.user && auth.role === 2022
   ? 
    <Outlet />
   : 
    <Navigate to="/login" state={{ from: location }} replace />
  )
};

export default RequireAuth;
