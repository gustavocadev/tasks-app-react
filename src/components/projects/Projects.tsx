import FormTask from "../tasks/FormTask"
import ListTask from "../tasks/ListTask"
import { useContext, useEffect } from "react"
import { ProjectContext } from "../../context/projects/ProjectContext"
const Projects = () => {
  const { obtainProjects } = useContext(ProjectContext)

  useEffect(() => {
    obtainProjects()
  }, [])

  return (
    <>
      <FormTask />
      <section className="contenedor-tareas">
        <ListTask />
      </section>
    </>
  )
}

export default Projects
