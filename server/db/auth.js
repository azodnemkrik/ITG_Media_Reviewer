const client = require('./client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const findUserByToken = async (token) => {
    try {
        const payload = await jwt.verify(token, process.env.JWT)
        const SQL = `
            SELECT id, first_name, last_name, email, org_code, is_admin, avatar
            FROM users
            WHERE id = $1
        `

        const response = await client.query (SQL , [payload.id])
        if(!response.rows.length) {
            const error = Error('Unsuccessful, please check your credentials')
            error.status = 401
            throw error
        }

        return response.rows[0]

    } catch (error) {
        console.log(error)
        const er = Error('Bad or No token found.')
        er.status = 401
        throw er
    }
}

const authenticate = async (credentials) => {
    const SQL = `
        SELECT id, password
        FROM users
        WHERE email = $1
    `

    const response = await client.query(SQL , [credentials.email])
    if(!response.rows.length) {
        const error = Error("Invalid Email")
        error.status = 401
        throw error
    }

    const valid = await bcrypt.compare(credentials.password, response.rows[0].password)
    if(!valid) {
        const error = Error("Invalid Password")
        error.status = 401
        throw error
    }
    const token = await jwt.sign({id: response.rows[0].id}, process.env.JWT)
    return {token}

}

module.exports = {
    findUserByToken,
    authenticate
}