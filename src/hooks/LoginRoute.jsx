import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function LoginRoute() {

  const { user, loading } = useAuth();

  if (loading) return null; 

  return user ? <Navigate to="/" /> : <Outlet />;
  
}