import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/dashboard";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "../../pages/404";

const Views: React.FC = () => {
    return (
        <Routes>
            <Route path='*' element={<PageNotFound />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default Views;
