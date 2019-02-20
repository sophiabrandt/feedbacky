const express = require('express')
const mongoose = require('mongoose')
require('./models/User')
require('./services/passport')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)

const app = express()

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
