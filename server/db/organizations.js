const client = require('./client')
const { v4 } = require('uuid')
const uuidv4 = v4

// CREATE ORGANIZATION
const createOrganization = async (organization) => {
    // Check for "only spaces" in the name
    if(!organization.name.trim()) {
        throw Error ('Must have a valid Organization Name')
    }

    // GENERATE SQL TO PASS
    const SQL = `
        INSERT INTO organizations
        (id, name, org_code, logo)
        VALUES
        ($1, $2, $3, $4)
        RETURNING * 
    `
    // GENERATE RESPONSE
    const response = await client.query(SQL , [uuidv4(), organization.name, organization.org_code, organization.logo])
    return response.rows[0]
}

// READ ORGANIZATIONS
const fetchOrganizations = async () => {
    const SQL = `
        SELECT *
        FROM organizations
    `
    const response = await client.query(SQL)
    return response.rows
}

module.exports = {
    createOrganization,
    fetchOrganizations
}


