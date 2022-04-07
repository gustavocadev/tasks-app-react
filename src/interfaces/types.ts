export type User = {
  name?: string
  email: string
  id?: string
  password?: string
}

export type Project = {
  name: string
  id?: string
  _id: string
}

export type TaskType = {
  name: string
  taskState?: boolean
  id?: string
  idTask?: string
  taskSelected?: {
    idTask: string
    name: string
    stateTask: boolean
    id: string
    _id?: string
  }
  _id?: string
  project?: string
}
