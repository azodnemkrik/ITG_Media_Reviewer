const client = require('./client')
const { v4 } = require('uuid')
const uuidv4 = v4

// CREATE PROJECT
const createProject = async (project) => {
    // Check for "only spaces" in the name
    // if(!project.project_name.trim()) {
    //     throw Error ('Must have a valid Project Name')
    // }

    // GENERATE SQL TO PASS
    const SQL = `
        INSERT INTO projects
        (id, org_code, job_number)
        VALUES
        ($1, $2, $3)
        RETURNING * 
    `
    // GENERATE RESPONSE
    const response = await client.query(SQL , [uuidv4(), project.org_code, project.job_number])
    return response.rows[0]
}


// CREATE CREATIVES
const createCreative = async (creative) => {
    // Check for "only spaces" in the name
    if(!creative.creative_name.trim()) {
        throw Error ('Must have a valid Creative Name')
    }

    // GENERATE SQL TO PASS
    const SQL = `
        INSERT INTO creatives
        (id, creative_name, job_number)
        VALUES
        ($1, $2, $3)
        RETURNING * 
    `
    
    // GENERATE RESPONSE
    const response = await client.query(SQL , [uuidv4(), creative.creative_name, creative.job_number])
    return response.rows[0]

}

// READ PROJECTS
const fetchProjects = async () => {
    const SQL = `
        SELECT *
        FROM projects
    `
    const response = await client.query(SQL)
    console.log('Project:', response.rows[0])
    return response.rows
}


module.exports = {
    createProject,
    createCreative,
    fetchProjects
}


