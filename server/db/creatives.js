const client = require('./client')
const { v4 } = require('uuid')
const uuidv4 = v4

// CREATE CREATIVES
const createCreative = async (creative) => {
    // Check for "only spaces" in the name
    if(!creative.creative_name.trim()) {
        throw Error ('Must have a valid Creative Name')
    }

    // GENERATE SQL TO PASS
    const SQL = `
        INSERT INTO creatives
        (id, creative_name, org_code, job_number)
        VALUES
        ($1, $2, $3, $4)
        RETURNING * 
    `
    
    // GENERATE RESPONSE
    const response = await client.query(SQL , [uuidv4(), creative.creative_name, creative.org_code, creative.job_number])
    return response.rows[0]

}

// READ CREATIVES
const fetchCreatives = async () => {
    const SQL = `
        SELECT *
        FROM creatives
    `
    const response = await client.query(SQL)
    return response.rows
}


module.exports = {
    createCreative,
    fetchCreatives
}