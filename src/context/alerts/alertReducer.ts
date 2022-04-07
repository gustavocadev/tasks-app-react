import { HIDE_ALERT, SHOW_ALERT } from "../../types"
import { AlertState } from "./AlertProvider"

type Action =
  | {
      type: "SHOW_ALERT"
      payload: {
        msg: string
        category: string
      }
    }
  | {
      type: "HIDE_ALERT"
      payload: {
        msg: string
        category: string
      }
    }

const alertReducer = (state: AlertState, action: Action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      }
    case HIDE_ALERT:
      return {
        ...state,
        alert: action.payload,
      }

    default:
      return state
  }
}

export { alertReducer }
