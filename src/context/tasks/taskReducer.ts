import { TaskType } from "../../interfaces/Task";
import { PROJECTS_TASKS, ADD_TASK, VALIDATE_TASK, DELETE_TASK, TASK_STATE, ACTUAL_TASK, UPDATE_TASK } from "../../types";


type State = {
    tasksProjects: TaskType[],
    // tasks: TaskType[]
    errorTask: boolean
    taskSelected: TaskType
}
type Action = {
    type: string
    payload?: string | TaskType| any
}


const taskReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "OBTAIN_TASKS_PROJECTS":
            return {
                ...state,
                tasksProjects: action.payload
            }
            
        case ADD_TASK:
            return {
                ...state,
                tasksProjects: action.payload,
                errorTask: false,
            }
        case VALIDATE_TASK: 
            return {
                ...state,
                errorTask: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasksProjects: action.payload
            }
         case TASK_STATE:
            return {
                ...state,
                tasksProjects: action.payload
            };
        case ACTUAL_TASK:
            return {
                ...state,
                taskSelected: action.payload
            };
        case UPDATE_TASK:
            return {
                ...state,
                tasksProjects: action.payload
            };
        default:
            return state;
    }
};

export { taskReducer };
