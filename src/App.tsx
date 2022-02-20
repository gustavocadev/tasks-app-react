import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Projects from "./components/projects/Projects";
import { AlertState } from "./context/alerts/alertState";
import { AuthState } from "./context/auth/authState";
import { ProjectState } from "./context/projects/projectState";
import { TaskState } from "./context/tasks/taskState";
import { useEffect } from "react";
import { PrivateRoute } from "./components/routes/privateRoute";

const App = () => {
    useEffect(() => {
        localStorage.getItem("token");
    }, []);
    const { VITE_BACKEND_URL } = import.meta.env;
    console.log(VITE_BACKEND_URL);
    return (
        <ProjectState>
            <TaskState>
                <AlertState>
                    <AuthState>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route element={<PrivateRoute />}>
                                    <Route
                                        path="/projects"
                                        element={<Projects />}
                                    />
                                    <Route path="/" element={<Login />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </AuthState>
                </AlertState>
            </TaskState>
        </ProjectState>
    );
};

export default App;
