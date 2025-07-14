const client = require('./client')
const { v4 } = require('uuid')
const uuidv4 = v4

// CREATE Banner
const createBanner = async (banner) => {
    // // Check for "only spaces" in the name
    // if(!banner.name.trim()) {
    //     throw Error ('Must have a valid Banner Name')
    // }

    // GENERATE SQL TO PASS
    const SQL = `
        INSERT INTO banners
        (id, width, height, project_name, is_mobile, link)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING * 
    `
    
    // GENERATE RESPONSE
    const response = await client.query(SQL , [uuidv4(), banner.width, banner.height, banner.project_name, banner.is_mobile, banner.link])
    return response.rows[0]
}

// READ
const fetchBanners = async () => {
    const SQL = `
        SELECT *
        FROM banners
    `
    const response = await client.query(SQL)
    console.log('All banners:', response.rows.map(banner => ({ id: banner.id, name: banner.name })))
    return response.rows
}

const fetchSingleBanner = async (bannerId) => {
    console.log('fetchSingleBanner called with ID:', bannerId)
    const SQL = `
        SELECT *
        FROM banners
        WHERE id = $1
    `
    const response = await client.query(SQL , [bannerId])
    console.log('Query response rows:', response.rows.length)
    console.log('First row:', response.rows[0])
    return response.rows[0]
}
// UPDATE
// DELETE

module.exports = {
    createBanner,
    fetchBanners,
    fetchSingleBanner
}