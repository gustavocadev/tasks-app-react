import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/alerts/AlertContext";
import { AuthContext } from "../../context/auth/AuthContext";

const Signup = () => {
    const { alert, showAlert } = useContext(AlertContext);

    const { signupUser, isAuthenticated, message, userAutheticated } =
        useContext(AuthContext);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const navigate = useNavigate();

    // destructure user object
    const { email, password, password2, name } = user;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    // submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("handleSubmit");
        // do something with user
        const authUser = [
            email.trim(),
            password.trim(),
            password2.trim(),
            name.trim(),
        ];
        if (authUser.includes("")) {
            showAlert("Please fill in all fields", "alerta-error");
            return;
        }

        if (password.length < 6) {
            showAlert("Password must be at least 6 characters", "alerta-error");
            return;
        }

        if (password !== password2) {
            showAlert("Passwords must match", "alerta-error");
            return;
        }

        signupUser({
            email,
            password,
            name,
        });
    };

    useEffect(() => {
        isAuthenticated && navigate("/projects");

        message && showAlert(message.msg, message.category);
    }, [isAuthenticated, message]);

    useEffect(() => {
        userAutheticated();
        isAuthenticated && navigate("/projects");
    }, []);

    return (
        <section className="form-usuario">
            {alert && (
                <div className={`alerta ${alert.category}`}>{alert.msg}</div>
            )}
            <section className="contenedor-form sombra-dark">
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <section className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            onChange={handleChange}
                            value={name}
                        />
                    </section>

                    <section className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            onChange={handleChange}
                            value={email}
                        />
                    </section>

                    <section className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            onChange={handleChange}
                            value={password}
                        />
                    </section>

                    <section className="campo-form">
                        <label htmlFor="confirmPassword">
                            Confirmar Password
                        </label>
                        <input
                            type="text"
                            id="confirmPassword"
                            name="password2"
                            placeholder="Your password again"
                            onChange={handleChange}
                            value={password2}
                        />
                    </section>

                    <section className="campo-form">
                        <button
                            type="submit"
                            className="btn btn-primario btn-block"
                        >
                            Signup
                        </button>
                    </section>
                </form>
                <Link to="/" className="enlace-cuenta">
                    Volver a iniciar sesion
                </Link>
            </section>
        </section>
    );
};

export default Signup;
