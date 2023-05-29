import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserData } from '../store/UserData';
import { getItem } from "./localStorage";

const useAuth = () => {
    const token= getItem('user')
    const checkLogin = () => {
        if (token) {
            return true;
        }
        else {
            return false;
        }
    }

    useEffect(() => {
        checkLogin();
    }, [token, checkLogin]);
    
    return checkLogin();
};

const ProtectedRoutes: React.FC = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
