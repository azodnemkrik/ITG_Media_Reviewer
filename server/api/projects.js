const express = require('express')
const app = express.Router()

const { 
    fetchProjects
} = require('../db/projects')


app.get('/', async (req, res, next) => {
    try {
        res.send(await fetchProjects())
    } catch (error) {
        next(error)
    }
})

module.exports = app