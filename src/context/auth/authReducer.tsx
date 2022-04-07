import { User } from "../../interfaces"
import { StateType } from "./AuthProvider"
import {
  GET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL,
  LOGOUT,
  REGISTER_ERROR,
  REGISTER_SUCCESSFUL,
} from "../../types"

type Action =
  | { type: "REGISTER_SUCCESSFUL"; payload: { token: string } }
  | { type: "LOGIN_SUCCESSFUL"; payload: { token: string } }
  | { type: "LOGIN_ERROR"; payload: { msg: string; category: string } }
  | { type: "GET_USER"; payload: User }
  | { type: "REGISTER_ERROR"; payload: { msg: string; category: string } }
  | { type: "LOGOUT" }

const authReducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case REGISTER_SUCCESSFUL:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        message: {
          msg: "",
          category: "",
        },
        loading: false,
      }

    case LOGIN_SUCCESSFUL:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        message: {
          msg: "",
          category: "",
        },
        loading: false,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        message: action.payload,
        loading: false,
      }
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      }
    case REGISTER_ERROR:
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        message: action.payload,
        loading: false,
      }

    case LOGOUT:
      localStorage.removeItem("token")
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        user: {
          id: "",
          name: "",
          email: "",
        },
        loading: true,
      }
    default:
      return state
  }
}

export { authReducer }
