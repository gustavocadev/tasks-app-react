import { createContext } from 'react';
import { User } from '../../interfaces/User';


type AuthContextType = {
    signupUser: (data: User) => void;
    token: string;
    isAuthenticated: boolean;
    user: User,
    message: {
        msg: string,
        category: string,
    }
    login: (data: User) => void;
    userAutheticated: () => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    signupUser: () => { },
    token: '',
    isAuthenticated: false,
    user: {
        name: '',
        email: '',
        id: '',
    },
    message: {
        msg: '',
        category: ''
    },
    login: () => { },
    userAutheticated: () => { },
    logout: () => { },
    loading: true

})

export {
    AuthContext
}