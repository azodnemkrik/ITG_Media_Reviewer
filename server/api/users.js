const express = require('express')
const app = express.Router()

const { 
    fetchAllUsers,
    fetchUserById,
    updateUser
} = require('../db/users')

app.get('/', async(req,res,next)=> {
    try {
        res.send(await fetchAllUsers())
    } catch (error) {
        next(error)
    }
})

app.get('/:id', async(req,res,next)=> {
    try {
        const user = await fetchUserById(req.params.id)
        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }
        res.send(user)
    } catch (error) {
        next(error)
    }
})

/*
app.get('/', async (req, res, next) => {
    try {
        res.send(await fetchBanners())
    } catch (error) {
        next(error)
    }
})
*/ 

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

app.put('/:id', async(req,res,next)=> {
    try {
        const user = await updateUser(req.params.id, req.body)
        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }
        res.send(user)
    } catch (error) {
        next(error)
    }
})

module.exports = app    