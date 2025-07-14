const client = require('./client')
const { v4 } = require('uuid')
const uuidv4 = v4

// CREATE PROJECT
const createProject = async (project) => {
    // Check for "only spaces" in the name
    if(!project.project_name.trim()) {
        throw Error ('Must have a valid Project Name')
    }

    // GENERATE SQL TO PASS
    const SQL = `
        INSERT INTO projects
        (id, project_name, org_code)
        VALUES
        ($1, $2, $3)
        RETURNING * 
    `
    // GENERATE RESPONSE
    const response = await client.query(SQL , [uuidv4(), project.project_name, project.org_code])
    return response.rows[0]
}

module.exports = {
    createProject
}


