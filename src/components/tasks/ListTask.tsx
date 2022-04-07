import Task from "./Task"
import { useContext, useEffect } from "react"
import { ProjectContext } from "../../context/projects/ProjectContext"
import { TaskContext } from "../../context/tasks/TaskContext"
type Props = {}

const ListTask = (props: Props) => {
  const { project, deleteProject } = useContext(ProjectContext)
  const { tasksProjects, obtainAllTasks } = useContext(TaskContext)

  const handleDelete = () => {
    deleteProject(project._id)
  }

  // useEffect(() => {
  //     obtainAllTasks();
  // }, []);

  // console.log(tasksProjects)

  return (
    <>
      {project?.name !== "" ? (
        <>
          <h2>Proyecto: {project.name}</h2>
          <ul className="listado-tareas">
            {tasksProjects.length === 0 && (
              <li className="tarea">
                <p>No hay tareas...</p>
              </li>
            )}
            {tasksProjects.map((task) => {
              return <Task task={task} key={task._id} />
            })}
            <button className="btn btn-eliminar" onClick={handleDelete}>
              Delete Project &times;
            </button>
          </ul>
        </>
      ) : (
        <h1>Selecciona un proyecto</h1>
      )}
    </>
  )
}

export default ListTask
