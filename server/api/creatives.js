const express = require('express')
const app = express.Router()
const { 
    fetchCreatives
} = require('../db/creatives')

app.get('/', async(req,res,next)=> {
    try {
        res.send(await fetchCreatives())
    } catch (error) {
        next(error)
    }
})


module.exports = app