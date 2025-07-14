const express = require("express")
const app = express.Router()

//define api routes here
app.use('/users', require('./users'))
app.use('/banners', require('./banners'))

module.exports = app