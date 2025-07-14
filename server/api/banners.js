const express = require('express')
const app = express.Router()

const {
    fetchBanners,
    fetchSingleBanner
} = require('../db/banners')

app.get('/', async (req , res , next) => {
    try {
        res.send(await fetchBanners())
    } catch (error) {
        next(error)
    }
})


app.get('/:id', async (req , res , next) => {
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



module.exports = app