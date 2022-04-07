import { ReactNode, useReducer } from "react"
import { ProjectContext } from "./ProjectContext"
import { projectReducer } from "./projectReducer"
import {
  FORM_PROJECT,
  OBTAIN_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
} from "../../types/index"
import { Project } from "../../interfaces"

export type StateType = {
  form: boolean
  projects: Project[]
  errorForm: boolean
  project: Project | any
}

const INITIAL_STATE: StateType = {
  form: false,
  projects: [],
  errorForm: false,
  project: {
    name: "",
    id: "",
  },
}

const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { VITE_BACKEND_URL } = import.meta.env

  // Dispatchers
  const [state, dispatch] = useReducer(projectReducer, INITIAL_STATE)

  // Actions
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT,
    })
  }

  // obtain the projects
  const obtainProjects = async () => {
    try {
      const resp = await fetch(`${VITE_BACKEND_URL}/api/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token") ?? "",
        },
      })
      const { projects } = await resp.json()

      console.log(projects)

      dispatch({
        type: OBTAIN_PROJECTS,
        payload: projects,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // add project
  const addProject = async (project: Project) => {
    try {
      const resp = await fetch(`${VITE_BACKEND_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token") || "",
        },
        body: JSON.stringify(project),
      })
      const data = await resp.json()

      await obtainProjects()
      dispatch({
        type: ADD_PROJECT,
        payload: state.projects,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // validate form
  const validateForm = () => {
    dispatch({
      type: VALIDATE_FORM,
    })
  }

  // project
  const actualProject = (project: string) => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: project,
    })
  }

  // delete project
  const deleteProject = async (id: string) => {
    try {
      const resp = await fetch(`${VITE_BACKEND_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token") || "",
        },
      })
      const data = await resp.json()

      await obtainProjects()
      dispatch({
        type: "DELETE_PROJECT",
        payload: state.projects,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        showForm,
        obtainProjects,
        addProject,
        validateForm,
        actualProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export { ProjectProvider }
