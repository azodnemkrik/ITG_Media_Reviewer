const express = require("express")
const app = express.Router()

//define api routes here
app.use('/users', require('./users'))
app.use('/banners', require('./banners'))
app.use('/projects', require('./projects'))
app.use('/organizations', require('./organizations'))
app.use('/creatives', require('./creatives'))
app.use('/frames', require('./frames'))
app.use('/auth', require('./auth'))

module.exports = app