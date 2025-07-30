import { all } from "axios"
import { Link, useNavigate } from "react-router-dom"

const Projects = ({ allProjects, allBanners, allCreatives, allOrganizations, user }) => {
	const navigate = useNavigate()
	return (
		<div className="projectsContainer">
			{
				// Check if user is logged in
				user.id ? (

					// Check if ITG or CLIENT
					user.org_code !== "ITG" ? (

						// Show ONLY CLIENT's Projects
						allProjects
							.filter(project => project.org_code === user.org_code)
							// .filter(project => project.job_number === banner.job_number)
							.map(project => {
								const org = allOrganizations.find((org) => org.org_code === project.org_code);
								return (
									<div className="projectCard" key={project.id}>
										<div className="orgLogoContainer">
											<img className="orgLogo" src={org.logo} alt={org.name} />
											<h3>{project.org_code}-{project.job_number}</h3>
										</div>

										{/* <h3>Organization: {user.org_code}</h3> */}
										<h3>{project.org_code}-{project.job_number}</h3>
										{
											allCreatives
												.filter((creative) => creative.job_number === project.job_number)
												.map((creative) => (
													<>
														<div key={creative.id} className="creativeContainer">
															<ol>
																<h3>{creative.creative_name}</h3>
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
															</ol>
														</div>
													</>

												))
										}
									</div>
								)
							})
					) : (
						// Show ALL Projects
						allProjects
							.map(project => {
								const org = allOrganizations.find((org) => org.org_code === project.org_code);
								return (
									<div className="projectCard" key={project.id}>
										<div className="orgLogoContainer">
											<img className="orgLogo" src={org.logo} alt={org.name} />
											<h3>{project.org_code}-{project.job_number}</h3>
										</div>
										{
											allCreatives
												.filter((creative) => creative.job_number === project.job_number)
												.map((creative) => (
													<>
														<div key={creative.id} className="creativeContainer">
															<ol>
																<h3>{creative.creative_name}</h3>
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
															</ol>
														</div>
													</>

												))
										}
									</div>
								);
							})
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