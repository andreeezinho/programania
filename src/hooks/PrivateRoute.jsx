import { useAuth } from "./useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({children}){

    const {user, loading} = useAuth();

    if(loading) return null;

    return user ? <Outlet /> : <Navigate to="/login" />

}