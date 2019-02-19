require('dotenv').config()
const passport = require('@passport-next/passport')
const GoogleStrategy = require('@passport-next/passport-google-oauth2').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile, done)
    }
  )
)
