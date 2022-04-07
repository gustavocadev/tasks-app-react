import { Project } from "../../interfaces"
import { StateType } from "./ProjectProvider"
import {
  FORM_PROJECT,
  OBTAIN_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
} from "../../types/index"

type ActionType =
  | { type: "FORM_PROJECT" }
  | { type: "OBTAIN_PROJECTS"; payload: Project[] }
  | { type: "ADD_PROJECT"; payload: Project[] }
  | { type: "VALIDATE_FORM" }
  | { type: "ACTUAL_PROJECT"; payload: string }
  | { type: "DELETE_PROJECT"; payload: Project[] }

const projectReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case FORM_PROJECT:
      return {
        ...state,
        form: true,
      }
    case OBTAIN_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      }
    case ADD_PROJECT:
      return {
        ...state,
        projects: action.payload,
        form: false,
        errorForm: false,
      }
    case VALIDATE_FORM:
      return {
        ...state,
        errorForm: true,
      }
    case ACTUAL_PROJECT:
      return {
        ...state,
        project: state.projects.find(
          (project) => project._id === action.payload
        ),
      }
    case DELETE_PROJECT:
      return {
        ...state,
        projects: action.payload,
        project: {
          name: "",
          id: "",
        },
      }

    default:
      return state
  }
}

export { projectReducer }
