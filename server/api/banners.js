const express = require('express')
const app = express.Router()

const {
    fetchBanners,
    fetchSingleBanner,
    fetchStoryboard,
    fetchFrames
} = require('../db/banners')
const { isLoggedIn } = require('./middleware')

app.get('/', async (req, res, next) => {
    try {
        res.send(await fetchBanners())
    } catch (error) {
        next(error)
    }
})


app.get('/:id', async (req, res, next) => {
    try {
        console.log('API route called with ID:', req.params.id)
        const result = await fetchSingleBanner(req.params.id)
        console.log('Result from fetchSingleBanner:', result)
        res.send(result)
    } catch (error) {
        console.error('Error in banner/:id route:', error)
        next(error)
    }
})

// app.get('/storyboard/:id', async (req, res, next) => {
//     try {
//         res.send(await fetchStoryboard(req.params.id))
//     } catch (error) {
//         next(error)
//     }

// })



app.get('/storyboard/:storyboardId', async (req, res, next) => {
    try {
        res.send(await fetchFrames(req.params.storyboardId))
    } catch (error) {
        next(error)
    }
})

module.exports = app