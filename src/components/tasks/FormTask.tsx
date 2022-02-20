import { useContext, FormEvent, useState, ChangeEvent, useEffect } from "react";
import { ProjectContext } from "../../context/projects/projectContext";
import { TaskContext } from "../../context/tasks/taskContext";
import { TaskType } from "../../interfaces/Task";
import { UPDATE_TASK } from "../../types";
type Props = {};

const FormTask = (props: Props) => {
    const { project } = useContext(ProjectContext);
    const {
        addTask,
        validateTask,
        errorTask,
        // getTasks,
        taskSelected,
        saveActualTask,
        updateTask,
        obtainAllTasks,
    } = useContext(TaskContext);

    const [task, setTask] = useState<TaskType>({
        name: "",
        taskState: false,
    });

    const { name } = task;
    // useefecct to detect if a task is selected
    useEffect(() => {
        if (taskSelected.name !== "") {
            setTask(taskSelected);
            return;
        }
        setTask({
            name: "",
        });
    }, [taskSelected]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (taskSelected.name !== "") {
            updateTask(task);

            saveActualTask({
                name: "",
                taskState: false,
                project: "",
                _id: "",
            });

            setTask({
                name: "",
                taskState: false,
            });
            return;
        }

        const fields = [name.trim()];
        if (fields.includes("")) {
            validateTask();
            return;
        }
        task.project = project._id;
        addTask(task);

        // getTasks(project._id);

        saveActualTask({
            name: "",
            taskState: false,
            project: "",
            _id: "",
        });

        setTask({
            name: "",
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task,
            name: e.target.value,
        });
    };
    return (
        <>
            {project.name !== "" && (
                <section className="formulario">
                    <form onSubmit={handleSubmit}>
                        <section className="contenedor-input">
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Name"
                                name="name"
                                value={task.name}
                                onChange={handleChange}
                            />
                        </section>
                        <section className="contenedor-input">
                            <button
                                type="submit"
                                className="btn btn-primario btn-block btn-submit"
                            >
                                {taskSelected._id !== ""
                                    ? "Update Task"
                                    : "Add Task"}
                            </button>
                        </section>
                    </form>
                    {errorTask && (
                        <p className="mensaje error">
                            The name of the task is required
                        </p>
                    )}
                </section>
            )}
        </>
    );
};

export default FormTask;
