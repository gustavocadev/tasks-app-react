import { Navigate, Route, Routes } from "react-router-dom"
import { AlertProvider } from "./context/alerts"
import { AuthProvider } from "./context/auth"
import { ProjectProvider } from "./context/projects"
import { useEffect } from "react"
import { PrivateRoutesLayout } from "./auth/privateRoute"
import { TaskProvider } from "./context/tasks"
import LoginPage from "./routes/login/login"
import SignupPage from "./routes/signup/signup"
import ProjectsPage from "./routes/projects/projects"

const App = () => {
  useEffect(() => {
    localStorage.getItem("token")
  }, [])
  const { VITE_BACKEND_URL } = import.meta.env
  // console.log(VITE_BACKEND_URL)
  return (
    <ProjectProvider>
      <TaskProvider>
        <AlertProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route element={<PrivateRoutesLayout />}>
                <Route path="/projects" element={<ProjectsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </AuthProvider>
        </AlertProvider>
      </TaskProvider>
    </ProjectProvider>
  )
}

export default App
