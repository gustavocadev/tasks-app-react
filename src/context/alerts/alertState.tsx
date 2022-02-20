import { useReducer, ReactNode } from "react";
import { HIDE_ALERT, SHOW_ALERT } from "../../types";
import { AlertContext } from "./alertContext";
import { alertReducer } from "./alertReducer";

type AlertState = {
    children: ReactNode;
};

const AlertState = ({ children }: AlertState) => {
    const initialState = {
        alert: {
            msg: "",
            category: "",
        },
    };
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // functions
    const showAlert = (msg: string, category: string) => {
        dispatch({
            type: SHOW_ALERT,
            payload: { msg, category },
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT,
                payload: {
                    msg: "",
                    category: "",
                },
            });
        }, 3000);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export { AlertState };
