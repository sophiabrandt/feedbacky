require('dotenv').config()

// Express
const express = require('express')
const app = express()

// Helmet
const helmet = require('helmet')
app.use(helmet())

// set content security policy
app.use(
  // [
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://checkout.stripe.com'],
      frameSrc: ["'self'", 'https://checkout.stripe.com'],
      childSrc: ["'self'", 'https://checkout.stripe.com'],
      scriptSrc: ["'self'", 'https://checkout.stripe.com'],
      styleSrc: [
        "'self'",
        'https://fonts.googleapis.com',
        'https://checkout.stripe.com',
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'https://*.stripe.com', 'https://res.cloudinary.com'],
      baseUri: ["'self'"],
    },
  })
  // helmet.noCache()
  // ]
)

// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
require('./models/User')
require('./models/Survey')

// Cookie Session
const cookieSession = require('cookie-session')
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
    httpOnly: true,
  })
)
// Passport
const passport = require('@passport-next/passport')
require('./services/passport')
app.use(passport.initialize())
app.use(passport.session())

// Routes
const authRouter = require('./routes/auth')
const billingRouter = require('./routes/billing')
const apiRouter = require('./routes/api')
const surveyRouter = require('./routes/survey')
app.use('/auth', authRouter)
app.use('/api/stripe', billingRouter)
app.use('/api/surveys', surveyRouter)
app.use('/api', apiRouter)

// serve production assets or index.html file if route is on client side
if (process.env.NODE_ENV === 'production') {
  // production assets (main.js, main.css files)
  app.use(express.static('client/build'))

  // serve client index.html file if no route matches
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// PORT
const PORT = process.env.PORT || 5000
app.listen(PORT)
