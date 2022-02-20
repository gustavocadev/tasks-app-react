import { ProjectContext } from "../../context/projects/projectContext";
import { useContext } from "react";
import { TaskContext } from "../../context/tasks/taskContext";
import { Project } from "../../interfaces/Project";

type ProjectProps = {
    project: Project;
};

const ProjectComponent = ({ project }: ProjectProps) => {
    const { actualProject } = useContext(ProjectContext);
    const { obtainAllTasks } = useContext(TaskContext);
    // add actual project

    return (
        <li>
            <button
                className="btn btn-blank"
                onClick={() => {
                    actualProject(project._id);
                    obtainAllTasks();
                }}
            >
                {project.name}
            </button>
        </li>
    );
};

export default ProjectComponent;
