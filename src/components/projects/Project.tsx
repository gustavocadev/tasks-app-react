import { ProjectContext } from "../../context/projects/ProjectContext"
import { useContext } from "react"
import { Project } from "../../interfaces/Project"
import { TaskContext } from "../../context/tasks/TaskContext"

type ProjectProps = {
  project: Project
}

const ProjectComponent = ({ project }: ProjectProps) => {
  const { actualProject } = useContext(ProjectContext)
  const { obtainAllTasks } = useContext(TaskContext)
  // add actual project

  return (
    <li>
      <button
        className="btn btn-blank"
        onClick={() => {
          actualProject(project._id)
          obtainAllTasks()
        }}
      >
        {project.name}
      </button>
    </li>
  )
}

export default ProjectComponent
