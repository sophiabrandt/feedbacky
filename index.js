require('custom-env').env()

// Express
const express = require('express')
const app = express()

// Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
require('./models/User')

// Cookie Session
const cookieSession = require('cookie-session')
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
)

// Passport
const passport = require('@passport-next/passport')
require('./services/passport')
app.use(passport.initialize())
app.use(passport.session())

// Routes
const authRouter = require('./routes/auth')
const rootRouter = require('./routes/root')
app.use('/auth', authRouter)
app.use('/', rootRouter)

// PORT
const PORT = process.env.PORT || 5000
app.listen(PORT)
