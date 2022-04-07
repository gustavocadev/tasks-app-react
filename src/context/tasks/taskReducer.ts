import { TaskType } from "../../interfaces"
import {
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  TASK_STATE,
  ACTUAL_TASK,
  UPDATE_TASK,
} from "../../types"
import { TaskState } from "./TaskProvider"

type Action =
  | {
      type: "OBTAIN_TASKS_PROJECTS"
      payload?: string | TaskType | any
    }
  | { type: "ADD_TASK"; payload: TaskType[] }
  | { type: "VALIDATE_TASK" }
  | { type: "DELETE_TASK"; payload: TaskType[] }
  | { type: "TASK_STATE"; payload: TaskType[] }
  | { type: "ACTUAL_TASK"; payload: TaskType }
  | { type: "UPDATE_TASK"; payload: TaskType[] }

const taskReducer = (state: TaskState, action: Action) => {
  switch (action.type) {
    case "OBTAIN_TASKS_PROJECTS":
      return {
        ...state,
        tasksProjects: action.payload,
      }

    case ADD_TASK:
      return {
        ...state,
        tasksProjects: action.payload,
        errorTask: false,
      }
    case VALIDATE_TASK:
      return {
        ...state,
        errorTask: true,
      }
    case DELETE_TASK:
      return {
        ...state,
        tasksProjects: action.payload,
      }
    case TASK_STATE:
      return {
        ...state,
        tasksProjects: action.payload,
      }
    case ACTUAL_TASK:
      return {
        ...state,
        taskSelected: action.payload,
      }
    case UPDATE_TASK:
      return {
        ...state,
        tasksProjects: action.payload,
      }
    default:
      return state
  }
}

export { taskReducer }
