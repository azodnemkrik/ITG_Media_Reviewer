const express = require('express')
const app = express.Router()

const {
    fetchOrganizations
} = require('../db/organizations')


app.get('/', async (req, res, next) => {
    try {
        res.send(await fetchOrganizations())
    } catch (error) {
        next(error)
    }
})

module.exports = app