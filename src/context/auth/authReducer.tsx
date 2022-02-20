import { User } from "../../interfaces/User";
import {
    GET_USER,
    LOGIN_ERROR,
    LOGIN_SUCCESSFUL,
    LOGOUT,
    REGISTER_ERROR,
    REGISTER_SUCCESSFUL,
} from "../../types";

type State = {
    token: string;
    isAuthenticated: boolean;
    user: User;
    message: string;
    loading: boolean;
};

type Action = {
    type: string;
    payload?: any;
};

const authReducer = (state: State, action: Action) => {
    switch (action.type) {
        case REGISTER_SUCCESSFUL:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                message: {
                    msg: "",
                    category: "",
                },
                loading: false,
            };

        case LOGIN_SUCCESSFUL:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                message: {
                    msg: "",
                    category: "",
                },
                loading: false,
            };

        case LOGIN_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                token: "",
                message: action.payload,
                loading: false,
            };
        case GET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false,
            };
        case REGISTER_ERROR:
            return {
                ...state,
                token: "",
                isAuthenticated: false,
                message: action.payload,
                loading: false,
            };

        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: "",
                isAuthenticated: false,
                user: {
                    id: "",
                    name: "",
                    email: "",
                },
                loading: true,
            };
        default:
            return state;
    }
};

export { authReducer };
