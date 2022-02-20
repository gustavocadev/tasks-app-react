import { HIDE_ALERT, SHOW_ALERT } from "../../types";

type State = {
    alert: {
        msg: string;
        category: string;
    };
}

type Action = {
    type: string;
    payload: any;
}


const alertReducer = (state: State, action: Action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case HIDE_ALERT:
            return {
                ...state,
                alert: {
                    msg: '',
                    category: ''
                }
            }

        default:
            return state;
    }
}

export {
    alertReducer
}