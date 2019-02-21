require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('@passport-next/passport')
const GoogleStrategy = require('@passport-next/passport-google-oauth2').Strategy

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

      if (existingUser) return done(null, existingUser)

      const user = await new User({ googleId: profile.id }).save()
      done(null, user)
    }
  )
)
