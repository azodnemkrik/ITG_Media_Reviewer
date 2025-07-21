import { all } from "axios"
import { Link, useNavigate } from "react-router-dom"

const Projects = ({ allProjects, allBanners, allCreatives, user }) => {
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
                            // .filter(project => project.job_number === banner.job_number)
                            .map(project => (
                                <div>
                                    {/* <h3>Organization: {user.org_code}</h3> */}
                                    <h3>{project.org_code}-{project.job_number}</h3>
                                    {
                                        allCreatives
                                            .filter((creative) => creative.job_number === project.job_number)
                                            .map((creative) => (
                                                <>
                                                    <div key={creative.id}>
                                                        <h4>{creative.creative_name}</h4>
                                                    </div>
                                                    <ul>
                                                        {
                                                            allBanners
                                                                .filter(banner => banner.creative_name === creative.creative_name)
                                                                .map(banner => (
                                                                    <li key={banner.id}>
                                                                        <Link to={`/banners/${banner.id}`}>
                                                                            Banner: {banner.width} x {banner.height}
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                        }
                                                    </ul>
                                                </>

                                            ))
                                    }
                                    <hr></hr>
                                </div>
                            ))
                    ) : (
                        // Show ALL Projects
                        allProjects
                            .map(project => (
                                <div>
                                    {/* <h3>Organization: {user.org_code}</h3> */}
                                    <h3>{project.org_code}-{project.job_number}</h3>
                                    {
                                        allCreatives
                                            .filter((creative) => creative.job_number === project.job_number)
                                            .map((creative) => (
                                                <>
                                                    <div key={creative.id}>
                                                        <h4>{creative.creative_name}</h4>
                                                    </div>
                                                    <ul>
                                                        {
                                                            allBanners
                                                                .filter(banner => banner.creative_name === creative.creative_name)
                                                                .map(banner => (
                                                                    <li key={banner.id}>
                                                                        <Link to={`/banners/${banner.id}`}>
                                                                            Banner: {banner.width} x {banner.height}
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                        }
                                                    </ul>
                                                </>

                                            ))
                                    }
                                    <hr></hr>
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