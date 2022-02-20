import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ProjectContext } from "../../context/projects/projectContext";
import { Project } from "../../interfaces/Project";
const NewProject = () => {
    const {
        form,
        showForm,
        addProject,
        validateForm,
        errorForm,
        obtainProjects,
    } = useContext(ProjectContext);

    // state  for project name
    const [projectName, setProjectName] = useState({
        name: "",
        _id: "",
    });

    // state for project description
    const { name } = projectName;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectName({
            ...projectName,
            [e.target.name]: e.target.value,
        });
    };
    // sumbit form
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fields = [name.trim()];
        if (fields.includes("")) {
            validateForm();
            return;
        }

        // add to state

        addProject(projectName as Project);
        // get updated projects

        // obtainProjects();
        setProjectName({
            name: "",
            _id: "",
        });
    };
    return (
        <>
            <button className="btn btn-block btn-primario" onClick={showForm}>
                New Project
            </button>
            {form && (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Project Name"
                        name="name"
                        value={name}
                        ref={(input) => input && input.focus()}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="btn btn-primario btn-block "
                    >
                        Add Project
                    </button>
                </form>
            )}
            {errorForm && (
                <p className="mensaje error">The project name is required</p>
            )}
        </>
    );
};

export default NewProject;
