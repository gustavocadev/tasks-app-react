import { taskReducer } from "./taskReducer"
import { useReducer, ReactNode } from "react"
import { TaskContext } from "./TaskContext"
import { ADD_TASK, VALIDATE_TASK, DELETE_TASK, TASK_STATE } from "../../types"
import { TaskType } from "../../interfaces"

export type TaskState = {
  tasksProjects: TaskType[]
  // tasks: TaskType[]
  errorTask: boolean
  taskSelected: TaskType
}

const INITIAL_STATE: TaskState = {
  tasksProjects: [],
  errorTask: false,
  taskSelected: {
    name: "",
    taskState: false,
    _id: "",
    project: "",
  },
}

const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { VITE_BACKEND_URL } = import.meta.env

  const [state, dispatch] = useReducer(taskReducer, INITIAL_STATE)

  // actions
  const obtainAllTasks = async () => {
    try {
      const resp = await fetch(`${VITE_BACKEND_URL}/api/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token") ?? "",
        },
      })
      const { tasks } = await resp.json()

      console.log(tasks)
      dispatch({
        type: "OBTAIN_TASKS_PROJECTS",
        payload: tasks,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const addTask = async (task: TaskType) => {
    try {
      const resp = await fetch(`${VITE_BACKEND_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token") ?? "",
        },
        body: JSON.stringify(task),
      })
      const data = await resp.json()

      console.log(data)

      obtainAllTasks()
      dispatch({
        type: ADD_TASK,
        payload: state.tasksProjects,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // validate task
  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    })
  }

  const deleteTask = async (taskId: string) => {
    try {
      const resp = await fetch(`${VITE_BACKEND_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token") ?? "",
        },
      })

      const data = await resp.json()

      // I do again the call to the api to set the updated tasks
      obtainAllTasks()

      dispatch({
        type: DELETE_TASK,
        payload: state.tasksProjects,
      })
    } catch (error) {}
  }

  const changeStateTask = async (idTask: string) => {
    try {
      const changedState = !state.tasksProjects.find(
        (task: TaskType) => task._id === idTask
      ).taskState

      const resp = await fetch(`${VITE_BACKEND_URL}/api/tasks/${idTask}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token") ?? "",
        },
        body: JSON.stringify({
          taskState: changedState,
        }),
      })
      const data = await resp.json()

      // I do again the call to the api to set the updated tasks
      obtainAllTasks()
      dispatch({
        type: TASK_STATE,
        payload: state.tasksProjects,
      })
    } catch (error) {
      console.log(error)
    }
  }

  //
  const saveActualTask = (taskSelected: TaskType) => {
    dispatch({
      type: "ACTUAL_TASK",
      payload: taskSelected,
    })
  }

  const updateTask = async (task: TaskType) => {
    try {
      const resp = await fetch(`${VITE_BACKEND_URL}/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token") ?? "",
        },
        body: JSON.stringify(task),
      })
      const data = await resp.json()

      // I do again the call to the api to set the updated tasks
      obtainAllTasks()
      dispatch({
        type: "UPDATE_TASK",
        payload: state.tasksProjects,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        // tasks: state.tasks,
        // getTasks,
        ...state,
        addTask,
        validateTask,
        deleteTask,
        changeStateTask,
        saveActualTask,
        updateTask,
        obtainAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export { TaskProvider }
