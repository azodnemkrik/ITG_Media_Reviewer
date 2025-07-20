const express = require('express')
const app = express.Router()

app.get('/', async(req,res,next)=> {
    try {
        res.send("inside of GET /api/users route!")
    } catch (error) {
        next(error)
    }
})

app.post('/register', async(req,res,next)=> {
    try {
        res.send("inside of POST /api/users/register route!")
    } catch (error) {
        next(error)
    }
})


app.get('/me', async(req,res,next)=> {
    try {
        res.send("inside of GET /api/users/me route!")
    } catch (error) {
        next(error)
    }
})


module.exports = app    