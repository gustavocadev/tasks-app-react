import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
type Props = {};

const Bar = (props: Props) => {
    const { userAutheticated, user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
        logout();
    };

    return (
        <header className="app-header">
            {user?.name && (
                <p className="nombre-usuario">
                    Hola <span>{user.name}</span>
                </p>
            )}
            <nav className="nav-principal">
                <a onClick={handleLogout} className="cerrar-sesion">
                    Cerrar sesion
                </a>
            </nav>
        </header>
    );
};

export default Bar;
