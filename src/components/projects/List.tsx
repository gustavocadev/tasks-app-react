import ProjectComponent from "./Project"
import { useContext } from "react"
import { ProjectContext } from "../../context/projects/"
const List = () => {
  const { projects } = useContext(ProjectContext)

  // console.log(projects)
  return (
    <>
      {projects?.length > 0 ? (
        <ul className="listado-proyectos">
          {projects.map((project) => {
            return <ProjectComponent project={project} key={project._id} />
          })}
        </ul>
      ) : (
        <p>There's no projects!</p>
      )}
    </>
  )
}

export default List
