import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { Navigate, Outlet } from "react-router-dom";
import { TaskState } from "../../context/tasks/taskState";
const PrivateRoute = () => {
    const { userAutheticated, isAuthenticated, loading } =
        useContext(AuthContext);

    // const {} = useContext(TaskState)

    useEffect(() => {
        userAutheticated();
    }, []);

    return !isAuthenticated && !loading ? <Navigate to="/" /> : <Outlet />;
};

export { PrivateRoute };
