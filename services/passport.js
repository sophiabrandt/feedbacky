require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('@passport-next/passport')
const GoogleStrategy = require('@passport-next/passport-google-oauth2').Strategy

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        existingUser
          ? done(null, existingUser)
          : new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user))
      })
    }
  )
)
