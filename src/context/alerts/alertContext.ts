import { createContext } from 'react';

type Alert = {
    msg: string;
    category: string;
}

type AlertContextType = {
    alert: Alert
    showAlert: (message: string, type: string) => void;
}

const AlertContext = createContext<AlertContextType>({
    showAlert: () => { },
    alert: {
        msg: '',
        category: ''
    },
})

export {
    AlertContext
}