import { Link } from "react-router-dom"

const Projects = ({ allProjects }) => {

        return (
        <div>
            {
                allProjects.map((project) => {
                    return (
                        <div>
                            <h3>Organization: {project.org_code}</h3>
                            <p>Job Number: {project.job_number}</p>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Projects
