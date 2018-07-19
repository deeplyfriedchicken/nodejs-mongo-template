require('./config/config.js')
require('./db/mongoose')

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/', routes)

const port = process.env.PORT

if (!module.parent) { app.listen(port) }

console.log(`Application started. Listening on port:` + port)

module.exports = { app }
