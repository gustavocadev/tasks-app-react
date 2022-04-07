import { useContext, useEffect } from "react"
import { AuthContext } from "../context/auth/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import SideBar from "../components/layout/SideBar"
import Bar from "../components/layout/Bar"
const PrivateRoutesLayout = () => {
  const { userAutheticated, isAuthenticated, loading } = useContext(AuthContext)

  useEffect(() => {
    userAutheticated()
  }, [])

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />
  }

  return (
    <section className="contenedor-app">
      <SideBar />
      <section className="seccion-principal">
        <Bar />
        <main>
          <Outlet />
        </main>
      </section>
    </section>
  )
}

export { PrivateRoutesLayout }
