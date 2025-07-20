import { Link, useNavigate } from "react-router-dom"

const Projects = ({ allProjects, allBanners, user }) => {
    const navigate = useNavigate()
    return (
        <div>
            {
                // Check if user is logged in
                user.id ? (

                    // Check if ITG or CLIENT
                    user.org_code !== "ITG" ? (

                        // Show ONLY CLIENT's Projects
                        allProjects
                            .filter(project => project.org_code === user.org_code)
                            .map(project => (
                                <div>
                                    <h3>{user.first_name} {user.last_name}, {user.org_code}</h3>
                                    <h3>Organization: {project.org_code}</h3>
                                    <p>Job Number: {project.job_number}</p>
                                    <ul>
                                    {
                                         allBanners.filter(banner => banner.job_number === project.job_number).map(banner => (
                                             <li key={banner.id}>
                                                 <Link to={`/banners/${banner.id}`}>
                                                     Banner: {banner.width} x {banner.height}
                                                 </Link>
                                             </li>
                                         ))
                                    }
                                    </ul>
                                    <hr />
                                </div>
                            ))
                    ) : (
                        // Show ALL Projects
                        allProjects
                            .map(project => (
                                <div>
                                    <h3>{user.first_name} {user.last_name}, {user.org_code}</h3>
                                    <h3>Organization: {project.org_code}</h3>
                                    <p>Job Number: {project.job_number}</p>
                                    <ul>
                                    {
                                         allBanners.filter(banner => banner.job_number === project.job_number).map(banner => (
                                             <li key={banner.id}>
                                                 <Link to={`/banners/${banner.id}`}>
                                                     Banner: {banner.width} x {banner.height}
                                                 </Link>
                                             </li>
                                         ))
                                    }
                                    </ul>
                                    <hr />
                                </div>
                        ))
                    )

                ) : (
                    <p>Please log in</p>
                )


                // Show User's Projects

            }
        </div>
    )
}

export default Projects

/*


                    allProjects
                    .filter(project => project.org_code === user.org_code)
                    .map(project => (
                            <div>
                                <h3>{user.first_name} {user.last_name}, {user.org_code}</h3>
                                <h3>Organization: {project.org_code}</h3>
                                <p>Job Number: {project.job_number}</p>
                                <hr />
                            </div>
                        ))
                ) : (
                    allProjects.map(project => (
                            <div>
                                <h3>{user.first_name} {user.last_name}, {user.org_code}</h3>
                                <h3>Organization: {project.org_code}</h3>
                                <p>Job Number: {project.job_number}</p>
                                <hr />
                            </div>
                        ))
                )

*/