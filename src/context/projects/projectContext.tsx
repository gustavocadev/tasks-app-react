import { createContext } from "react";
import { Project } from "../../interfaces/Project";

type ContextType = {
    form: boolean;
    showForm: () => void;
    projects: Project[];
    obtainProjects: () => void;
    addProject: (project: Project) => void;
    validateForm: () => void;
    errorForm: boolean;
    project: Project;
    actualProject: (project: string) => void;
    deleteProject: (id: string) => void;
};

const ProjectContext = createContext<ContextType>({
    form: false,
    showForm: () => {},
    projects: [{ name: "", id: "", _id: "" }],
    obtainProjects: () => {},
    addProject: () => {},
    validateForm: () => {},
    errorForm: false,
    project: {
        name: "",
        id: "",
        _id: "",
    },
    actualProject: () => {},
    deleteProject: () => {},
});

export { ProjectContext };
