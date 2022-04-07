import { ChangeEvent, useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AlertContext } from "../../context/alerts/AlertContext"
import { AuthContext } from "../../context/auth/AuthContext"

const Login = () => {
  const { alert, showAlert } = useContext(AlertContext)

  const { login, isAuthenticated, message, userAutheticated } =
    useContext(AuthContext)

  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  // destructure user object
  const { email, password } = user

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }
  // submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("handleSubmit")
    // do something with user
    const authUser = [email, password]
    if (authUser.includes("")) {
      showAlert("Please fill in all fields", "alerta-error")
      return
    }

    login({
      email,
      password,
    })
  }

  useEffect(() => {
    isAuthenticated && navigate("/projects")

    if (message.msg !== "") {
      message && showAlert(message.msg, "alerta-error")
    }
  }, [isAuthenticated, message])

  useEffect(() => {
    userAutheticated()
    isAuthenticated && navigate("/projects")
  }, [])

  return (
    <section className="form-usuario">
      {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
      <section className="contenedor-form sombra-dark">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <section className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Your email"
              onChange={handleChange}
              value={email}
            />
          </section>

          <section className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Your password"
              onChange={handleChange}
              value={password}
            />
          </section>

          <section className="campo-form">
            <button type="submit" className="btn btn-primario btn-block">
              Login
            </button>
          </section>
        </form>
        <Link to="/signup" className="enlace-cuenta">
          Crear cuenta
        </Link>
      </section>
    </section>
  )
}

export default Login
