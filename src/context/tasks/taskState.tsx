import { taskReducer } from "./taskReducer";
import { useReducer, ReactNode } from "react";
import { TaskContext } from "./taskContext";
import {
    PROJECTS_TASKS,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    TASK_STATE,
} from "../../types";
import { TaskType } from "../../interfaces/Task";

type Props = {
    children: ReactNode;
};
const TaskState = ({ children }: Props) => {
    const { VITE_BACKEND_URL } = import.meta.env;

    const initialState = {
        tasksProjects: [],
        errorTask: false,
        taskSelected: {
            name: "",
            taskState: false,
            _id: "",
            project: "",
        },
    };

    const [state, dispatch] = useReducer(taskReducer, initialState);

    const obtainAllTasks = async () => {
        try {
            const resp = await fetch(`${VITE_BACKEND_URL}/api/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-token": localStorage.getItem("token") ?? "",
                },
            });
            const { tasks } = await resp.json();

            console.log(tasks);
            dispatch({
                type: "OBTAIN_TASKS_PROJECTS",
                payload: tasks,
            });
        } catch (error) {
            console.log(error);
        }
    };

    // const obtainTasksByProject = () => {

    // }

    // add one task
    const addTask = async (task: TaskType) => {
        try {
            const resp = await fetch(`${VITE_BACKEND_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-token": localStorage.getItem("token") ?? "",
                },
                body: JSON.stringify(task),
            });
            const data = await resp.json();

            console.log(data);

            obtainAllTasks();
            dispatch({
                type: ADD_TASK,
                payload: state.tasksProjects,
            });
        } catch (error) {
            console.log(error);
        }
    };

    // validate task
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK,
        });
    };

    const deleteTask = async (taskId: string) => {
        try {
            const resp = await fetch(
                `${VITE_BACKEND_URL}/api/tasks/${taskId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "x-token": localStorage.getItem("token") ?? "",
                    },
                }
            );

            const data = await resp.json();

            // I do again the call to the api to set the updated tasks
            obtainAllTasks();

            dispatch({
                type: DELETE_TASK,
                payload: state.tasksProjects,
            });
        } catch (error) {}
    };

    const changeStateTask = async (idTask: string) => {
        try {
            const changedState = !state.tasksProjects.find(
                (task: TaskType) => task._id === idTask
            ).taskState;

            const resp = await fetch(
                `${VITE_BACKEND_URL}/api/tasks/${idTask}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-token": localStorage.getItem("token") ?? "",
                    },
                    body: JSON.stringify({
                        taskState: changedState,
                    }),
                }
            );
            const data = await resp.json();

            // I do again the call to the api to set the updated tasks
            obtainAllTasks();
            dispatch({
                type: TASK_STATE,
                payload: state.tasksProjects,
            });
        } catch (error) {
            console.log(error);
        }
    };

    //
    const saveActualTask = (taskSelected: TaskType) => {
        dispatch({
            type: "ACTUAL_TASK",
            payload: taskSelected,
        });
    };

    const updateTask = async (task: TaskType) => {
        try {
            const resp = await fetch(
                `${VITE_BACKEND_URL}/api/tasks/${task._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-token": localStorage.getItem("token") ?? "",
                    },
                    body: JSON.stringify(task),
                }
            );
            const data = await resp.json();

            // I do again the call to the api to set the updated tasks
            obtainAllTasks();
            dispatch({
                type: "UPDATE_TASK",
                payload: state.tasksProjects,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                // tasks: state.tasks,
                // getTasks,
                tasksProjects: state.tasksProjects,
                addTask,
                errorTask: state.errorTask,
                validateTask,
                deleteTask,
                changeStateTask,
                saveActualTask,
                taskSelected: state.taskSelected,
                updateTask,
                obtainAllTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export { TaskState };
