import { Link } from "react-router-dom"

const Organizations = ({ allOrganizations }) => {

    return (
        <div>
            {
                allOrganizations.map((organization) => {
                    return (
                        <div>
                            <p><img className="orgLogo" src={organization.logo} alt={organization.name} /></p>
                            <p>{organization.name} ({organization.org_code})</p>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Organizations

/*
<iframe src='https://www.w3schools.com' title='banner'></iframe>

*/