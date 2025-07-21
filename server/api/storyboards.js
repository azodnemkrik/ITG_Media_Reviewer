const express = require('express')
const app = express.Router()
const { 
    fetchStoryboards
} = require('../db/storyboards')

app.get('/', async(req,res,next)=> {
    try {
        res.send(await fetchStoryboards())
    } catch (error) {
        next(error)
    }
})


module.exports = app