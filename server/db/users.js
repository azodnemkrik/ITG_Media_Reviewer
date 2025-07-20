const client = require('./client')
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')
const uuidv4 = v4

// CREATE USER
const createUser = async (user) => {
    // Check for spaces in email
    if (!user.email.trim()) {
        throw Error('You must have a valid email')
    }

    // Check for email minimums
    // if ((!user.email.includes('@')) 
        // ||
        // (!user.email.includes('.com')) ||
        // (!user.email.includes('.org')) ||
        // (!user.email.includes('.net')) ||
        // (!user.email.includes('.edu')) ||
        // (!user.email.includes('.group')) ||
        // (!user.email.includes('.gov'))
    // ) {
        // throw Error('You must have a valid email')
    // }

    // Check for spaces in password
    if (!user.password.trim()) {
        throw Error('You must have a valid password')
    }

    // Has the password so it is hidden in the database
    user.password = await bcrypt.hash(user.password, 6)

    // Generate SQL to Pass
    const SQL = `
        INSERT INTO users
        (id, first_name, last_name, email, password, org_code, is_admin, avatar)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `

  
    // Generate Response
    const response = await client.query(SQL, [
        uuidv4(),
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.org_code,
        user.is_admin,
        user.avatar
    ])
    return response.rows[0]


}


module.exports = {
    createUser
}