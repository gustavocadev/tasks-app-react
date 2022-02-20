import SideBar from "../layout/SideBar";
import Bar from "../layout/Bar";
import FormTask from "../tasks/FormTask";
import ListTask from "../tasks/ListTask";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { ProjectContext } from "../../context/projects/projectContext";
const Projects = () => {
    const { userAutheticated } = useContext(AuthContext);
    const { projects, obtainProjects } = useContext(ProjectContext);

    useEffect(() => {
        obtainProjects();
    }, []);

    return (
        <section className="contenedor-app">
            <SideBar />
            <main className="seccion-principal">
                <Bar />
                <section>
                    <FormTask />
                    <section className="contenedor-tareas">
                        <ListTask />
                    </section>
                </section>
            </main>
        </section>
    );
};

export default Projects;
