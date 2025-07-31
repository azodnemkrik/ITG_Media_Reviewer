import { all } from "axios"
import { Link } from "react-router-dom"

const Organizations = ({ allOrganizations, allUsers, user }) => {


	const getUsersByOrgCode = (org_code) => {
		// Check if allUsers is an array before filtering
		if (!allUsers || !Array.isArray(allUsers)) {
			return [];
		}
		return allUsers.filter(user => user.org_code === org_code);
	}

	// Add loading check
	if (!allOrganizations || !Array.isArray(allOrganizations)) {
		return <div>Loading organizations...</div>;
	}

	if (!allUsers || !Array.isArray(allUsers)) {
		return <div>Loading users...</div>;
	}

	return (
		<div className="allOrganizationsContainer">
			{
				user.org_code === "ITG" ? (
					allOrganizations.toSorted().map((organization) => {
						const users = getUsersByOrgCode(organization.org_code);
						return (
							<div className="organizationContainer" key={organization.id}>
								<div className="orgLogoInOrganization">
									<img className="orgLogo" src={organization.logo} alt={organization.name} />
									<h4>{organization.name} ({organization.org_code})</h4>
								</div><br />
								{users.map((user) => (
									<div key={user.id} className="userContainer">
										<img className="userAvatar" src={`data:image/png;base64, ${user.avatar}`} alt="User Avatar" />
										<p>{user.first_name} {user.last_name}
											{user.is_admin ? (
												<>
													<span class="material-symbols-outlined itgPink">
														shield_person
													</span>
												</>
											) : (null)}<br />
											<a href={`mailto:${user.email}`}>{user.email}</a>

										</p>
									</div>
								))}
								<hr />
							</div>
						)
					})
				) : (
					user.is_admin ? (
						allOrganizations.filter((organization) => (organization.org_code == user.org_code) || (organization.org_code == "ITG"))
							.map((organization) => {
								// Get users for the specific organization
								const users = getUsersByOrgCode(organization.org_code);
								return (
									<div className="organizationContainer" key={organization.id}>
										<div className="orgLogoContainer">
											<img className="orgLogo" src={organization.logo} alt={organization.name} />
											<h4>{organization.name} ({organization.org_code})</h4>
										</div><br />
										{users.map((user) => (
											<div key={user.id} className="userContainer">
												<img className="userAvatar" src={`data:image/png;base64, ${user.avatar}`} alt="User Avatar" />
												<p>{user.first_name} {user.last_name}
													{user.is_admin ? (
														<>
															<span class="material-symbols-outlined itgPink">
																shield_person
															</span>
														</>
													) : (null)}<br />
													<a href={`mailto:${user.email}`}>{user.email}</a>

												</p>
											</div>
										))}
										<hr />
									</div>
								)
							})
					) : (
						<div className="userContainer">
							<h4>User Dashboard</h4>
							{/* User specific content goes here */}
						</div>
					)
				)


			}
		</div>
	)
}

export default Organizations

/*
<iframe src='https://www.w3schools.com' title='banner'></iframe>

*/