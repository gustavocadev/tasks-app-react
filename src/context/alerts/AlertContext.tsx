import { createContext } from "react"

type Alert = {
  msg: string
  category: string
}

type AlertContextType = {
  alert: Alert
  showAlert: (message: string, type: string) => void
}

export const AlertContext = createContext({} as AlertContextType)
