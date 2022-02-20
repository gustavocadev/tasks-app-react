import { createContext } from "react";
import { TaskType } from "../../interfaces/Task";

type ContextType = {
    // getTasks: (projectId: string) => void;
    // tasks: unknown[];
    tasksProjects: TaskType[];
    addTask: (task: TaskType) => void;
    errorTask: boolean;
    validateTask: () => void;
    deleteTask: (taskId: string) => void;
    changeStateTask: (taskId: string) => void;
    saveActualTask: (task: TaskType) => void;
    taskSelected: TaskType;
    updateTask: (task: TaskType) => void;
    obtainAllTasks: () => void;
};

const TaskContext = createContext<ContextType>({
    // tasks: [],
    // getTasks: () => {},
    tasksProjects: [],
    addTask: () => {},
    errorTask: false,
    validateTask: () => {},
    deleteTask: () => {},
    changeStateTask: () => {},
    saveActualTask: () => {},
    taskSelected: {
        name: "",
        taskState: false,
        project: "",
        _id: "",
    },
    updateTask: () => {},
    obtainAllTasks: () => {},
});

export { TaskContext };
