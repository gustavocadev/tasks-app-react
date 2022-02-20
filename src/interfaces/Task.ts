type TaskType = {
    name: string;
    taskState?: boolean;
    id?: string;
    idTask?: string;
    taskSelected?: {
        idTask: string;
        name: string;
        stateTask: boolean;
        id: string;
        _id?: string;
    };
    _id?: string;
    project?: string
};

export type {
    TaskType
}