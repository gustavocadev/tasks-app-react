import { createContext } from "react"
import { TaskType } from "../../interfaces"

type ContextType = {
  // getTasks: (projectId: string) => void;
  // tasks: unknown[];
  tasksProjects: TaskType[]
  addTask: (task: TaskType) => void
  errorTask: boolean
  validateTask: () => void
  deleteTask: (taskId: string) => void
  changeStateTask: (taskId: string) => void
  saveActualTask: (task: TaskType) => void
  taskSelected: TaskType
  updateTask: (task: TaskType) => void
  obtainAllTasks: () => void
}

export const TaskContext = createContext({} as ContextType)
