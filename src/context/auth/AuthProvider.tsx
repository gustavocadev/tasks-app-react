import { AuthContext } from "./AuthContext"
import { useReducer, ReactNode } from "react"
import { authReducer } from "./authReducer"
import {
  GET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL,
  LOGOUT,
  REGISTER_ERROR,
  REGISTER_SUCCESSFUL,
} from "../../types"
import { User } from "../../interfaces"

export type StateType = {
  token: string
  isAuthenticated: boolean
  user: User
  message: {
    msg: string
    category: string
  }
  loading: boolean
}

const INITIAL_STATE: StateType = {
  token: localStorage.getItem("token") ?? "",
  isAuthenticated: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
  },
  message: {
    msg: "",
    category: "",
  },
  loading: true,
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  // actions
  const signupUser = async (newUser: User) => {
    try {
      const { VITE_BACKEND_URL } = import.meta.env
      const resp = await fetch(`${VITE_BACKEND_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      const data = await resp.json()

      if (!data.token) {
        const { errors } = data
        throw new Error(errors[0].msg)
      }
      dispatch({
        type: REGISTER_SUCCESSFUL,
        payload: {
          token: data.token,
        },
      })

      //
      console.log(data)
      userAutheticated()
    } catch (error) {
      const alert = {
        msg: String(error),
        category: "alerta-error",
      }
      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      })
    }
  }

  // return user autheticated
  const userAutheticated = async () => {
    try {
      const { VITE_BACKEND_URL } = import.meta.env
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("No token found")
      }

      const resp = await fetch(`${VITE_BACKEND_URL}/api/auth`, {
        method: "GET",
        headers: {
          "x-token": `${token}`,
        },
      })
      const data = await resp.json()

      dispatch({
        type: GET_USER,
        payload: data.user,
      })
    } catch (error) {
      const alert = {
        msg: String(error),
        category: "alerta-error",
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      })
    }
  }

  const login = async (data: User) => {
    const { VITE_BACKEND_URL } = import.meta.env
    try {
      // const token = localStorage.getItem("token") ?? "";
      const resp = await fetch(`${VITE_BACKEND_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const dataUser = await resp.json()

      if (!dataUser.token) {
        throw new Error(dataUser.message)
      }

      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: dataUser,
      })
      // I set in my state the user autheticated
      userAutheticated()
    } catch (error) {
      console.log(error)
      const alert = {
        msg: String(error),
        category: "alerta-error",
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      })
    }
  }

  const logout = () => {
    dispatch({
      type: LOGOUT,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signupUser,
        login,
        userAutheticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
