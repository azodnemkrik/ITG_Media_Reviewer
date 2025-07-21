const client = require('./client')
const { v4 } = require('uuid')
const uuidv4 = v4

// CREATE STORYBOARD
const createStoryboard = async (storyboard) => {

    // GENERATE SQL TO PASS
    const SQL = `
        INSERT INTO storyboards
        (id, banner_id)
        VALUES
        ($1, $2)
        RETURNING *
    `
    const response = await client.query(SQL, [uuidv4(), storyboard.banner_id])
    return response.rows[0]

}


// CREATE Frame
const createFrame = async (frame) => {
    const SQL = `
        INSERT INTO frames
        (id, storyboard_id, link)
        VALUES
        ($1, $2, $3)
        RETURNING *
    `
    const response = await client.query(SQL, [uuidv4(), frame.storyboard_id, frame.link])
    return response.rows[0]
}

// READ Storyboards
const fetchStoryboards = async () => {
    const SQL = `
        SELECT *
        FROM storyboards
    `
    const response = await client.query(SQL)
    return response.rows
}

// READ Frames for a specific storyboard
const fetchFrames = async (storyboardId) => {
    console.log('fetchFrames called with ID:', storyboardId)
    const SQL = `
        SELECT *
        FROM frames
        WHERE storyboard_id = $1
    `
    const response = await client.query(SQL, [storyboardId])
    console.log('Frames:', response.rows)
    return response.rows
}



module.exports = {
    createStoryboard,
    fetchStoryboards,
    createFrame,
    fetchFrames
}