import { createContext } from "react"
import { Project } from "../../interfaces"

type ContextType = {
  form: boolean
  showForm: () => void
  projects: Project[]
  obtainProjects: () => void
  addProject: (project: Project) => void
  validateForm: () => void
  errorForm: boolean
  project: Project
  actualProject: (project: string) => void
  deleteProject: (id: string) => void
}

export const ProjectContext = createContext({} as ContextType)
