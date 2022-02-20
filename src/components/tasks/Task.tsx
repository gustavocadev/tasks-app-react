import { useContext } from "react";
import { ProjectContext } from "../../context/projects/projectContext";
import { TaskContext } from "../../context/tasks/taskContext";
import { TaskType } from "../../interfaces/Task";

type Props = {
    task: TaskType;
};

const Task = ({ task }: Props) => {
    const { deleteTask, changeStateTask, saveActualTask } =
        useContext(TaskContext);
    const { project } = useContext(ProjectContext);

    const handleDelete = () => {
        deleteTask(task._id as string);
        // getTasks(project._id);
    };

    const handleState = () => {
        changeStateTask(task._id as string);
        // getTasks(project._id);
    };

    const handleEdit = () => {
        saveActualTask(task);
    };
    return (
        <li className="tarea sombra">
            <p>{task.name}</p>
            <section className="estado">
                {task.taskState ? (
                    <button className="completo" onClick={handleState}>
                        Completo
                    </button>
                ) : (
                    <button className="incompleto" onClick={handleState}>
                        Incompleto
                    </button>
                )}
            </section>
            <section className="acciones">
                <button className="btn btn-primario" onClick={handleEdit}>
                    Editar
                </button>
                <button className="btn btn-secundario" onClick={handleDelete}>
                    Eliminar
                </button>
            </section>
        </li>
    );
};

export default Task;
