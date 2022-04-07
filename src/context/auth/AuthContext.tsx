import { createContext } from "react"
import { User } from "../../interfaces"

type AuthContextType = {
  signupUser: (data: User) => void
  token: string
  isAuthenticated: boolean
  user: User
  message: {
    msg: string
    category: string
  }
  login: (data: User) => void
  userAutheticated: () => void
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext({} as AuthContextType)
