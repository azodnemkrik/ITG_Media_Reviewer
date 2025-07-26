const express = require('express')
const app = express.Router()
const { 
    fetchFrames,
    fetchSingleBannerFrames
} = require('../db/frames')

app.get('/', async(req,res,next)=> {
    try {
        res.send(await fetchFrames())
    } catch (error) {
        next(error)
    }
})

app.get('/:id', async (req,res,next) => {
    try {
        res.send(await fetchSingleBannerFrames(req.params.id))
    } catch (error) {
        next(error)
    }
})


module.exports = app