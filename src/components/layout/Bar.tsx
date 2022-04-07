import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth/AuthContext"
import { useNavigate } from "react-router-dom"
type Props = {}

const Bar = (props: Props) => {
  const { user, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/login")
    logout()
  }

  return (
    <header className="app-header">
      {user?.name && (
        <p className="nombre-usuario">
          Hola <span>{user.name}</span>
        </p>
      )}
      <nav className="nav-principal">
        <a onClick={handleLogout} className="cerrar-sesion">
          Cerrar sesion
        </a>
      </nav>
    </header>
  )
}

export default Bar
