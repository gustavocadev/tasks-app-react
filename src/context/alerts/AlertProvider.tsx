import { useReducer, ReactNode } from "react"
import { HIDE_ALERT, SHOW_ALERT } from "../../types"
import { AlertContext } from "./AlertContext"
import { alertReducer } from "./alertReducer"

export type AlertState = {
  alert: {
    msg: string
    category: string
  }
}

const INITIAL_STATE: AlertState = {
  alert: {
    msg: "",
    category: "",
  },
}

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(alertReducer, INITIAL_STATE)

  // actions
  const showAlert = (msg: string, category: string) => {
    dispatch({
      type: SHOW_ALERT,
      payload: { msg, category },
    })

    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
        payload: {
          msg: "",
          category: "",
        },
      })
    }, 3000)
  }

  return (
    <AlertContext.Provider
      value={{
        ...state,
        showAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export { AlertProvider }
