import { Project } from "../../interfaces/Project";
import {
    FORM_PROJECT,
    OBTAIN_PROJECTS,
    ADD_PROJECT,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT,
    TASK_STATE,
} from "../../types/index";

type ActionType = {
    type: string;
    payload?: Project[] | any | Project;
};

type StateTye = {
    form: boolean;
    projects: Project[];
    // validateForm: () => void;
    errorForm: boolean;
    project: Project | any;
};

const projectReducer = (state: StateTye, action: ActionType) => {
    switch (action.type) {
        case FORM_PROJECT:
            return {
                ...state,
                form: true,
            };
        case OBTAIN_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            };
        case ADD_PROJECT:
            return {
                ...state,
                projects: action.payload,
                form: false,
                errorForm: false,
            };
        case VALIDATE_FORM:
            return {
                ...state,
                errorForm: true,
            };
        case ACTUAL_PROJECT:
            return {
                ...state,
                project: state.projects.find(
                    (project) => project._id === action.payload
                ),
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: action.payload,
                project: {
                    name: "",
                    id: "",
                },
            };

        default:
            return state;
    }
};

export { projectReducer };
