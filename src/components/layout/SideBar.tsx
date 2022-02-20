import NewProject from "../projects/NewProject";
import List from "../projects/List";
const SideBar = () => {
    return (
        <aside>
            <h1>
                MERN <span>Tasks</span>
            </h1>
            <NewProject />
            <section className="proyectos">
                <h2>Tus proyectos</h2>
                <List />
            </section>
        </aside>
    );
};

export default SideBar;
