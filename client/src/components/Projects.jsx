import { Link } from "react-router-dom"

const Projects = ({ allProjects, setAllProjects }) => {
    return (
        <div>
            <h3>Projects</h3>
            {
                allProjects.map((project) => {
                    return (
                        <div key={project.id}>
                            <a href={`${project.link}`} target="_blank">
                                <h4>{project.name} - {project.width} x {project.height}</h4>
                            </a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Projects

/*
<iframe src='https://www.w3schools.com' title='banner'></iframe>

*/